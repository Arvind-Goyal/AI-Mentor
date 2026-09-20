/**
 * Rate Limiting & Concurrency Control Middleware
 * 
 * Features:
 * 1. Sliding window rate limiter to limit requests per minute per IP / User.
 * 2. Concurrency lock to prevent a single client from spamming concurrent analysis requests.
 */

// In-memory sliding window store: Map<identifier, Array<timestamp>>
const requestTimestamps = new Map();

// In-memory active processing lock: Set<identifier>
const activeClientAnalyses = new Set();

/**
 * Periodically purge stale timestamps every 5 minutes to prevent memory leak
 */
setInterval(() => {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  for (const [key, timestamps] of requestTimestamps.entries()) {
    const valid = timestamps.filter((t) => now - t < windowMs);
    if (valid.length === 0) {
      requestTimestamps.delete(key);
    } else {
      requestTimestamps.set(key, valid);
    }
  }
}, 5 * 60 * 1000);

/**
 * Extract unique client identifier (User ID if authenticated or IP address)
 */
const getClientIdentifier = (req) => {
  if (req.user && req.user._id) {
    return `user:${req.user._id}`;
  }
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return `ip:${forwarded.split(",")[0].trim()}`;
  }
  return `ip:${req.ip || req.socket?.remoteAddress || "unknown"}`;
};

/**
 * Creates a rate limiter middleware
 * @param {Object} options
 * @param {number} options.windowMs - Time window in milliseconds (default: 60,000ms = 1 min)
 * @param {number} options.maxRequests - Max allowed requests per window (default: 10)
 * @param {boolean} options.preventConcurrent - Prevent same client from running multiple concurrent analyses (default: true)
 * @param {string} options.message - Custom error message
 */
export const createRateLimiter = ({
  windowMs = 60 * 1000,
  maxRequests = 10,
  preventConcurrent = true,
  message = "Rate limit exceeded. Please wait a moment before trying again.",
} = {}) => {
  return (req, res, next) => {
    const identifier = getClientIdentifier(req);
    const now = Date.now();

    // 1. Check concurrent processing lock for this client
    if (preventConcurrent && activeClientAnalyses.has(identifier)) {
      return res.status(429).json({
        success: false,
        message: "An analysis is already in progress for your account. Please wait for it to complete before analyzing another problem.",
        rateLimit: {
          limit: maxRequests,
          remaining: 0,
          retryAfter: 5,
        },
      });
    }

    // 2. Sliding window check
    const userTimestamps = requestTimestamps.get(identifier) || [];
    const recentTimestamps = userTimestamps.filter((t) => now - t < windowMs);

    if (recentTimestamps.length >= maxRequests) {
      const oldest = recentTimestamps[0];
      const retryAfterSeconds = Math.ceil((oldest + windowMs - now) / 1000);

      res.setHeader("Retry-After", retryAfterSeconds);
      res.setHeader("X-RateLimit-Limit", maxRequests);
      res.setHeader("X-RateLimit-Remaining", 0);
      res.setHeader("X-RateLimit-Reset", Math.ceil((oldest + windowMs) / 1000));

      return res.status(429).json({
        success: false,
        message: `Too many analysis requests. You can analyze up to ${maxRequests} problems per minute. Please wait ${retryAfterSeconds}s before trying again.`,
        retryAfter: retryAfterSeconds,
      });
    }

    // Record this request
    recentTimestamps.push(now);
    requestTimestamps.set(identifier, recentTimestamps);

    // Set rate limit headers
    const remaining = Math.max(0, maxRequests - recentTimestamps.length);
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil((now + windowMs) / 1000));

    // Acquire active concurrency lock
    if (preventConcurrent) {
      activeClientAnalyses.add(identifier);

      const releaseLock = () => {
        activeClientAnalyses.delete(identifier);
      };

      res.on("finish", releaseLock);
      res.on("close", releaseLock);
    }

    next();
  };
};

/**
 * Dedicated rate limiter for the problem analysis endpoint:
 * Max 10 requests per 60 seconds per client, with concurrent request protection.
 */
export const analysisRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10,
  preventConcurrent: true,
  message: "Analysis rate limit exceeded. Please wait a moment before analyzing another problem.",
});
