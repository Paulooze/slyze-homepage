process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var httpProxy = require('http-proxy')
var http = require('http')

var proxy = httpProxy.createProxyServer({})

// Creating new HTTP server.
var server = http.createServer((req, res) => {
  console.log(req.url)
  delete req.headers.host
  delete req.headers['x-real-ip']
  delete req.headers['x-forwarded-for']
  delete req.headers['x-forwarded-host']
  delete req.headers['x-forwarded-port']
  delete req.headers['x-forwarded-proto']
  delete req.headers['x-original-forwarded-for']
  delete req.headers['x-original-uri']
  delete req.headers['x-scheme']

  console.log(req.headers)

  if (req.url === '/') {
    req.url = '/index.html'
  }
  req.headers.host = 'cdn.freshit.io'
  proxy.web(req, res, {
    target: 'https://cdn.freshit.io/slyze-fe-master'
  })
})

/*
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head)
})
*/

server.listen(3000)
