var createPool = require('ssdb').createPool;
var pool = createPool({
  host: '127.0.0.1',
  port: 8888,
  auth: null
});
var conn = pool.acquire();

module.exports = {
  conn
};