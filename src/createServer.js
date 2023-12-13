const fs = require('fs');
const path = require('path');

const { HttpServer } = require('./servers/http');
const { HttpsServer } = require('./servers/https');
const { Http2Server } = require('./servers/http2');
const { Http2cServer } = require('./servers/http2c');

const certPath = process.env.PATH_CERT ?? path.resolve(__dirname, '..', 'cert.pem');
const keyPath = process.env.PATH_KEY ?? path.resolve(__dirname, '..', 'key.pem');

const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);

const createServer = async () => {
  const servers = [
    new HttpServer(key, cert, +(process.env.PORT_HTTP || 7001)),
    new HttpsServer(key, cert, +(process.env.PORT_HTTPS || 7002)),
    new Http2cServer(key, cert, +(process.env.PORT_HTTP2_H2C || 7003)),
    new Http2Server(key, cert, +(process.env.PORT_HTTP2 || 7004)),
  ];

  for (const server of servers) {
    await server.init(); 
  }
}

module.exports = {
  createServer,
}