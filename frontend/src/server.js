const Express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');

const apiUrl = 'http://localhost:3030';

const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
    target: apiUrl,
    ws: true
});

app.use('/api', function(req, res) {
    proxy.web(req, res, { target: apiUrl });
});

app.use('/socket.io', function (req, res) {
   proxy.web(req, res, { target: apiUrl + '/socket.io'});
});

server.on('upgrade', function (req, socket, head) {
    console.log('PROXY UPGRADING');
    proxy.ws(req, socket, head);
});

app.use('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('Server listening on port 3000');
    }
});