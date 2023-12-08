# dev-echo-server

Echo server for development purposes only

## Ports

| Port | Protocol |
|---|---|
| 7001 | HTTP |
| 7002 | HTTPS |
| 7003 | HTTP/2 h2c |
| 7004 | HTTP/2 |

## CURL Scripts

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

## socket.io cli

```bash
# HTTP
npm run-script socketio -- http://localhost:7001 

# HTTPS
npm run-script socketio -- https://localhost:7002

# HTTP/2 h2c - NOT SUPPORTED

# HTTP/2
npm run-script socketio -- https://localhost:7004
```