const { createServer } = require("https");
const { BaseHttpServer } = require("../base/base.http");

class HttpsServer extends BaseHttpServer {
  async init() {
    this.server = createServer(
      {
        key: this.key,
        cert: this.cert,
      },
      (req, res) => {
        this.requestHandler(req, res);
      }
    );

    await new Promise(res => {
      this.server.listen(this.port, () => {
        console.log('[HTTPs] Server started on port', this.port);
        res();
      })
    });
  }
}

module.exports = {
  HttpsServer,
}
