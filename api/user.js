let express = require("express");
let router = express.Router();
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "blogs";

// 登陆
router.put("/", function (req, res) {
    console.log('put请求------')
    MongoClient.connect(
        url,
        function (err, client) {
            console.log("---Connected successfully to server----");
            const db = client.db(dbName);
            const {name, password} = req.body

            db.collection("user")
                .find({name, password})
                .toArray(function (err, result) {
                    if (err) throw err;
                    if (result.length === 1) {
                        let success = {
                            ret: 0,
                            message: 'success'
                        }
                        res.end(JSON.stringify(success));
                    } else {
                        let fail = {
                            ret: -1,
                            message: 'fail'
                        }
                        res.end(JSON.stringify(fail));
                    }

                    client.close();
                });
        }
    );
});

// 注册
router.post("/", function (req, res) {
    console.log("post请求----");
    const {name, password} = req.body

    MongoClient.connect(
        url,
        function (err, client) {
            //数据库
            const db = client.db(dbName);

            db.collection("user")
                .find({})
                .toArray(function (err, result) {
                    if (err) throw err;
                    let id = result.length + 1;

                    let data = {
                        name: name,
                        password: password,
                        id
                    };

                    db.collection("user").insertOne(data, function (err) {
                        if (err) throw err;
                        console.log("文档插入成功");
                        let response = {
                            ret: 0,
                            message: "success",
                            name: name
                        };
                        res.end(JSON.stringify(response));
                        client.close();
                    });
                });
        }
    );
});

module.exports = router;
