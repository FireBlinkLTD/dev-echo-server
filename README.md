# dev-echo-server

Simple echo server for development purposes.

Mainly developed to help with the testing of:
- [prxi](https://github.com/FireBlinkLTD/prxi) - zero runtime dependency HTTP, HTTP/2 proxy library
- [prxi-openid-connect](https://github.com/FireBlinkLTD/prxi-openid-connect) - OpenID Connect reverse proxy for HTTP, HTTP/2 connections

Supports:
- HTTP
- HTTPS
- HTTP/2 h2c
- HTTP/2
- WS
- WSS
  
## Usage

```bash
npm i -g dev-echo-server

# generate certificate and key
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout key.pem -out cert.pem

export PATH_CERT=cert.pem
export PATH_KEY=key.pem

dev-echo-server
```

## Ports

| Port | Protocol   | Environment Variable |
|------|------------|----------------------|
| 7001 | HTTP       | `PORT_HTTP`          | 
| 7002 | HTTPS      | `PORT_HTTPS`         |
| 7003 | HTTP/2 h2c | `PORT_HTTP2_H2C`     |
| 7004 | HTTP/2     | `PORT_HTTP2`         |


## Headers

### X-Add-Headers

`x-add-headers` Header can be used to add additional headers to the response. Value should be a JSON object.

**Example:**
```bash
curl http://localhost:7001 \
  -H 'x-add-headers: {"test": "test"}'
```

## Invocation examples

### CURL Scripts

```bash
# HTTP
curl http://localhost:7001/\?a\=b 

# HTTPS
curl https://localhost:7002/\?a\=b -k

# HTTP/2 h2c
# Upgrade for h2c is not supported by node thus `--http2-prior-knowledge` should be used
curl --http2-prior-knowledge http://localhost:7003/\?a\=b 

# HTTP/2
curl --http2 https://localhost:7004/\?a\=b -k
```

### Socket.IO CLI

```bash
npm i -g socket.io-cli

# expose env to trust self-signed certificate
export NODE_EXTRA_CA_CERTS=cert.pem 

# HTTP
socketio http://localhost:7001 

# HTTPS
socketio https://localhost:7002

# HTTP/2 h2c - NOT SUPPORTED

# HTTP/2
socketio https://localhost:7004

# Once connected just type <event> [args] and hit enter
```