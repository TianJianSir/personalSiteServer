const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
let bodyParser = require('body-parser');
const routes = require('./routes/index')
const dbPath = path.join(__dirname, './version.json')

// 设置端口
app.set('port', (process.env.PORT || 7000));
// 设置响应头
app.use("*", function (request, response, next) {
    // response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
    next();
});

app.use(/^\/site(\/\d+\.\d+.\d+)?/, function(req,...args){
    if(/^\/site\/\d+\.\d+.\d+/.test(req.baseUrl)){
        var position = req.baseUrl.indexOf('/',1)
        var version = req.baseUrl.slice(position+1)
        const staticPath = path.join(__dirname, '../siteStatic/', version)
        express.static(staticPath)(req,...args)
    }else{
        // 从配置文件中读取当前的版本
        fs.readFile(dbPath,'utf8',function(err,data){
            const Obj = JSON.parse(data)
            var version = Obj.site

            const staticPath = path.join(__dirname, '../siteStatic/', version)
            express.static(staticPath)(req,...args)
        })
    }

})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

routes(app)

var server = app.listen(app.get('port'), function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
