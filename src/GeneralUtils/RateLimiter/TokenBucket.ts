class TokenBucketRateLimiter {
	private capacity: number; // Maximum number of tokens the bucket can hold
	private rate: number; // Tokens added per second
	private lastCheckedAt: number; // Timestamp of the last token check
	private tokens: number; // Current number of tokens in the bucket

	constructor(capacity: number, rate: number) {
		this.capacity = capacity;
		this.rate = rate;
		this.tokens = capacity;
		this.lastCheckedAt = Date.now();
	}

	/**
	 * Check if the requested number of tokens is allowed.
	 * @param tokensRequested - Number of tokens requested.
	 * @returns True if the tokens are available, false otherwise.
	 */
	isAllowed(tokensRequested: number): boolean {
		const now = Date.now();
		const timePassed = (now - this.lastCheckedAt) / 1000; // Convert milliseconds to seconds
		this.lastCheckedAt = now;

		// Refill tokens based on the elapsed time
		this.tokens = Math.min(
			this.capacity,
			this.tokens + timePassed * this.rate
		);

		// Check if enough tokens are available
		if (this.tokens >= tokensRequested) {
			this.tokens -= tokensRequested;
			return true;
		}

		return false;
	}
}

// Example usage:
const bucketRateLimiter = new TokenBucketRateLimiter(10, 1); // Capacity = 10 tokens, rate = 1 token per second

// Simulate 15 requests with a delay of 100ms between each
for (let i = 0; i < 15; i++) {
	setTimeout(() => {
		console.log(bucketRateLimiter.isAllowed(1)); // First 10 requests will return true, next 5 will return false
	}, i * 100);
}

// Simulate a request after 1 second
setTimeout(() => {
	console.log(bucketRateLimiter.isAllowed(1)); // Should return true after tokens are refilled
}, 1000);
