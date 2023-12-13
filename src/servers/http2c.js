const { createServer } = require("http2");
const { BaseHttp2Server } = require("../base/base.http2");

class Http2cServer extends BaseHttp2Server {
  async init() {
    this.server = createServer(
      {
        allowHTTP1: true,
      },
      (req, res) => {
        this.requestHandler(req, res);
      }
    );

    this.server.on('stream', (stream, headers) => {
      this.streamHandler(stream, headers);
    });

    this.onInit();

    await new Promise(res => {
      this.server.listen(this.port, () => {
        console.log('[HTTP/2 Cleartext] Server started on port', this.port);
        res();
      })
    });
  }
}

module.exports = {
  Http2cServer,
}
