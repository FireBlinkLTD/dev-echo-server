const { createServer } = require("http");
const { BaseHttpServer } = require("../base/base.http");

class HttpServer extends BaseHttpServer {
  async init() {
    this.server = createServer((req, res) => {
      this.requestHandler(req, res);
    });

    this.onInit();
    
    await new Promise(res => {
      this.server.listen(this.port, () => {
        console.log('[HTTP] Server started on port', this.port);
        res();
      })
    });
  }
}

module.exports = {
  HttpServer,
}
