interface RateLimiterOptions {
	maxRequests: number;
	timeWindowMs: number;
}

class FixedWindowRateLimiter {
	private maxRequests: number;
	private timeWindowMs: number;
	private requestTimestamps: Map<string, number[]>; // Key: identifier (e.g., user ID, IP address)

	constructor(options: RateLimiterOptions) {
		this.maxRequests = options.maxRequests;
		this.timeWindowMs = options.timeWindowMs;
		this.requestTimestamps = new Map<string, number[]>();
	}

	isAllowed(identifier: string): boolean {
		const now = Date.now();
		const timestamps = this.requestTimestamps.get(identifier) || [];
		// Remove timestamps outside the current time window
		const recentTimestamps = timestamps.filter(
			(ts) => now - ts < this.timeWindowMs
		);

		if (recentTimestamps.length >= this.maxRequests) {
			return false;
		}

		// Add the current request timestamp
		recentTimestamps.push(now);
		this.requestTimestamps.set(identifier, recentTimestamps);

		return true;
	}
}

const limiter = new FixedWindowRateLimiter({
	maxRequests: 5,
	timeWindowMs: 60000,
}); // 5 requests per minute

function handleRequest(userId: string) {
	if (limiter.isAllowed(userId)) {
		console.log(`Request allowed for user ${userId}`);
	} else {
		console.log(`Rate limit exceeded for user ${userId}`);
	}
}

// Simulate requests from a user
handleRequest('user123');
handleRequest('user123');
handleRequest('user123');
handleRequest('user123');
handleRequest('user123');
handleRequest('user123');
