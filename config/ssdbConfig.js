var ssdb = require('ssdb');
var pool = ssdb.createPool({
    host: '127.0.0.1',
    port: 8888,
    auth: null
});
var conn = pool.acquire();
 
// useless api!
conn.set('key', 'val', function(err, data) {
  if (err) {
    throw err;
  }
  // data => '1'
});