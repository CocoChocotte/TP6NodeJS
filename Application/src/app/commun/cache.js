const memoryCache = (() => {
  const cache = {};
  return {
    get: key => cache[key],
    put: (key, body) => {
      cache[key] = body;
    }
  }
})();

const clientCache = duration => (req, res, next) => {
  res.setHeader('cache-control', `max-age=${duration}`);
  next();
};

const serverCache = duration => (req, res, next) => {
  const key = `cache_${new Date().getTime()}_${req.originalUrl || req.url}`;
  const cachedBody = memoryCache.get(key);
  if (cachedBody) {
    res.setHeader('content-type', 'application/json');
    res.send(cachedBody);
  } else {
    res.originalSend = res.send;
    res.send = body => {
      res.originalSend(body);
      memoryCache.put(key, body, duration * 1000);
    };
    next();
  }
};

module.exports = {
  clientCache,
  serverCache
};
