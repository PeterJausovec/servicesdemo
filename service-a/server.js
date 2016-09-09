var os = require('os');
var http = require('http');
var request = require('request');
var morgan = require('morgan');
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    var appInsights = require('applicationinsights').setup().start();
    appInsights.client.commonProperties = {
        "Service name": require("./package.json").name
    };
}
var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));

// api ------------------------------------------------------------
app.get('/api', function (req, res) {
       var redis = require('redis').createClient({host: 'redis'});
    // // Increment requestCount each time API is called
    redis.incr('requestCount', function (err, reply) {
        var requestCount = reply;
    });
    // Invoke service-b
    request('http://service-b', function (error, response, body) {
         res.send('Hello from service A running on ' + os.hostname() + ' and ' + body);
    });
});

app.get('/metrics', function (req, res) {
    var redis = require('redis').createClient({host: 'redis'});
    redis.get('requestCount', function (err, reply) {
        res.send({ requestCount: reply });
    });
});

// application -------------------------------------------------------------
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var ports = [80, 81, 82, 83, 84, 85];

function reqHandler(req, res) {
    var msg = {
        remoteAddress: req.socket.remoteAddress,
        remotePort: req.socket.remotePort,
        localAddress: req.socket.localAddress,
        localPort: req.socket.localPort,
        blah: 'hello!!!'
    };

    console.log(msg);
    res.write(JSON.stringify(msg));
    res.end();
}

var servers = [];
var s;
ports.forEach(function(port) {
    s = http.createServer(reqHandler);
    s.listen(port);
    servers.push(s);
});
