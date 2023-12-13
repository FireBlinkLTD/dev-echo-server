const { createSecureServer } = require("http2");
const { BaseHttp2Server } = require("../base/base.http2");

class Http2Server extends BaseHttp2Server {
  async init() {
    this.server = createSecureServer(
      {
        allowHTTP1: true,
        key: this.key,
        cert: this.cert,
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
        console.log('[HTTP/2] Server started on port', this.port);
        res();
      })
    });
  }
}

module.exports = {
  Http2Server,
}
