var express = require('express');
var app = express();
let bodyParser = require('body-parser');
var routes = require('./routes/index')

// 设置端口
app.set('port', (process.env.PORT || 9090));
// 设置响应头
app.use("*", function (request, response, next) {
    response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

routes(app)

var server = app.listen(app.get('port'), function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
