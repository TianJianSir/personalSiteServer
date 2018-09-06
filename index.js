var express = require('express');
var app = express();

app.get('/api/token', function (req, res) {
    res.send('this is token');
})

app.get('/api/interface', function (req, res) {
    res.send('this is interface');
})

app.post('/api/login', function (req, res) {
    // todo 操作mongdb

})

var server = app.listen(9090, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})