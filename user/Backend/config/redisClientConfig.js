const Redis = require("ioredis")

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379
});

redis.on("connect", () => console.log("Redis connected ✅"));
redis.on("error", (err) => console.error("Redis error ❌", err));

module.exports = redis

//see if elastic search support buy it with recommendation option


// use redis for
//     #product cache  -- cache the products
//   ??  #cart info cache  -- store whats in my cart for fast retrival
//     #inventory/Stock -- Fast decrement/increment of stock when multiple people buy at once.