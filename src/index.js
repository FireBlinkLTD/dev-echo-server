const fs = require('fs');
const path = require('path');

const { HttpServer } = require('./servers/http');
const { HttpsServer } = require('./servers/https');
const { Http2Server } = require('./servers/http2');
const { Http2cServer } = require('./servers/http2c');

const cert = fs.readFileSync(path.resolve(__dirname, '..', 'cert.pem'));
const key = fs.readFileSync(path.resolve(__dirname, '..', 'key.pem'));

const createServer = async () => {
  const servers = [
    new HttpServer(key, cert, 7001),
    new HttpsServer(key, cert, 7002),
    new Http2cServer(key, cert, 7003),
    new Http2Server(key, cert, 7004),
  ];

  for (const server of servers) {
    await server.init();
    await server.postInit();
  }
}

createServer().catch(err => {
  console.error(err);
  process.exit(1);
})
