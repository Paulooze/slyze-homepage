process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var httpProxy = require('http-proxy')
var http = require('http')

var proxy = httpProxy.createProxyServer({
  target: 'https://cdn.freshit.io/slyze-fe-master'
})

// Creating new HTTP server.
var server = http.createServer((req, res) => {
  console.log(req.headers)
  console.log(req.url)

  if (req.url === '/') {
    req.url = '/index.html'
  }
  req.headers.host = 'cdn.freshit.io'
  proxy.web(req, res)
})

/*
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head)
})
*/

server.listen(3000)
