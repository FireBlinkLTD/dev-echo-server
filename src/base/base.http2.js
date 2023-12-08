const { constants } = require("http2");
const { BaseHttpServer } = require("./base.http");

class BaseHttp2Server extends BaseHttpServer {
  streamHandler(stream, headers) {
    console.log('[HTTP/2] New stream');

    const chunks = [];
    stream.on('data', (chunk) => {
      console.log('[HTTP/2] on "data"');
      chunks.push(Buffer.from(chunk));
    });

    stream.on('end', () => {
      console.log('[HTTP/2] on "end"');
      const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf-8')) : undefined;

      const response = {
        http: {
          method: headers[constants.HTTP2_HEADER_METHOD],
          url: headers[constants.HTTP2_HEADER_PATH],
          protocol: 'HTTP/2',
        },
        body,
        headers: headers,
      };

      console.log('[HTTP/2] respond', response);
      stream.respond({
        'content-type': 'application/json',
        [constants.HTTP2_HEADER_STATUS]: 200,
      });
      stream.write(JSON.stringify(response));
      stream.end();
    });
  }
}

module.exports = {
  BaseHttp2Server,
}
