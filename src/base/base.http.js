const { BaseServer } = require("./base");
const { Server } = require('socket.io');

class BaseHttpServer extends BaseServer {
  io;

  async postInit() {
    this.io = new Server(this.server);

    this.io.on('connection', (socket) => {
      console.log('[WS] on "connection"');

      socket.onAny((event, ...args) => {
        console.log('[WS] event received', {
          event,
          args
        });

        socket.emit(event, ...args);        
      });

      socket.on('disconnect', () => {
        console.log('[WS] on "disconnect"');
      });
    });
  }

  requestHandler(req, res) {
    if (req.httpVersion === "2.0") {
      console.log('[HTTP/2] New request');
      // Ignore HTTP/2 requests
      return;
    }
    console.log('[HTTP] New request');

    const chunks = [];
    req.on('data', chunk => {
      console.log('[HTTP] on "data"');
      chunks.push(Buffer.from(chunk));
    })

    req.on('end', () => {
      console.log('[HTTP] on "end"');
      const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf-8')) : undefined;
      res.status = 200;

      const response = {
        http: {
          method: req.method,
          url: req.url,
          protocol: 'HTTP/' + req.httpVersion,
        },
        body,
        headers: req.headers,
      };

      console.log('[HTTP] response', response);
      res.write(JSON.stringify(response), () => {
        res.end();
      });
    });
  }
}

module.exports = {
  BaseHttpServer,
}
