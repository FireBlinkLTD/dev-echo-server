class BaseServer {
  key;
  cert;
  port;
  server;

  constructor (key, cert, port) {
    this.key = key;
    this.cert = cert;
    this.port = port;
  }
  
  onInit() {}
  async init() {}
}

module.exports = {
  BaseServer
}
