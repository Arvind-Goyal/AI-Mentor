/**
 * Lightweight Client-Side In-Memory Cache with TTL & In-Flight Request Deduplication
 * Makes navigation between Dashboard, History, Editor, and Profile instant (0ms loading).
 */

const cacheStore = new Map();
const inFlightPromises = new Map();

const DEFAULT_TTL_MS = 2 * 60 * 1000; // 2 minutes

/**
 * Retrieve cached data if present and not expired
 */
export const getCachedData = (key, ttl = DEFAULT_TTL_MS) => {
  const entry = cacheStore.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > ttl;
  if (isExpired) {
    return null;
  }

  return entry.data;
};

/**
 * Store data into cache
 */
export const setCachedData = (key, data) => {
  cacheStore.set(key, {
    data,
    timestamp: Date.now(),
  });
};

/**
 * Invalidate a specific key or all keys matching a prefix / pattern
 */
export const invalidateCache = (pattern) => {
  if (!pattern) {
    cacheStore.clear();
    return;
  }

  for (const key of cacheStore.keys()) {
    if (typeof pattern === "string" && key.includes(pattern)) {
      cacheStore.delete(key);
    } else if (pattern instanceof RegExp && pattern.test(key)) {
      cacheStore.delete(key);
    }
  }
};

/**
 * Fetch with cache & in-flight promise deduplication
 * If cached and fresh, returns cached data immediately.
 * If multiple components ask for the same data simultaneously, executes only 1 HTTP request.
 */
export const fetchWithCache = async (key, fetchFn, options = {}) => {
  const { ttl = DEFAULT_TTL_MS, force = false } = options;

  if (!force) {
    const cached = getCachedData(key, ttl);
    if (cached !== null) {
      return cached;
    }
  }

  // Deduplicate simultaneous requests for identical keys
  if (inFlightPromises.has(key)) {
    return inFlightPromises.get(key);
  }

  const promise = (async () => {
    try {
      const result = await fetchFn();
      setCachedData(key, result);
      return result;
    } finally {
      inFlightPromises.delete(key);
    }
  })();

  inFlightPromises.set(key, promise);
  return promise;
};
