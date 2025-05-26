interface RetryOptions {
	maxRetries?: number;
	initialDelayMs?: number;
	maxDelayMs?: number;
	factor?: number;
	jitter?: boolean;
}

const defaultRetryOptions: Required<RetryOptions> = {
	maxRetries: 3,
	initialDelayMs: 1000,
	maxDelayMs: 10000,
	factor: 2,
	jitter: true,
};

/**
 * Retry a function with exponential backoff
 * @param fn The function to retry (should return a Promise)
 * @param options Retry configuration options
 * @returns A Promise that resolves with the function's result or rejects after all retries fail
 */
export async function withRetry<T>(
	fn: () => Promise<T>,
	options: RetryOptions = {}
): Promise<T> {
	const { maxRetries, initialDelayMs, maxDelayMs, factor, jitter } = {
		...defaultRetryOptions,
		...options,
	};

	let attempt = 0;
	let error: unknown;

	while (attempt <= maxRetries) {
		try {
			return await fn();
		} catch (err) {
			error = err;
			if (attempt === maxRetries) break;

			const delay = calculateBackoffDelay(
				attempt,
				initialDelayMs,
				maxDelayMs,
				factor,
				jitter
			);
			await wait(delay);
			attempt++;
		}
	}

	throw error;
}

function calculateBackoffDelay(
	attempt: number,
	initialDelayMs: number,
	maxDelayMs: number,
	factor: number,
	jitter: boolean
): number {
	// Calculate exponential delay
	const delay = Math.min(
		initialDelayMs * Math.pow(factor, attempt),
		maxDelayMs
	);

	// Add jitter (randomness to avoid thundering herd problem)
	if (jitter) {
		const jitterAmount = Math.random() * delay;
		return Math.min(delay + jitterAmount, maxDelayMs);
	}

	return delay;
}

function wait(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchData(): Promise<any> {
	const response = await fetch('https://api.example.com/data');
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
}

// Using with default options
withRetry(fetchData)
	.then((data) => console.log('Data:', data))
	.catch((error) => console.error('Failed after retries:', error));

// With custom options
withRetry(fetchData, {
	maxRetries: 5,
	initialDelayMs: 500,
	maxDelayMs: 8000,
	factor: 1.5,
	jitter: true,
})
	.then((data) => console.log('Data:', data))
	.catch((error) => console.error('Failed after retries:', error));
