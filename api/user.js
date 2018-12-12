let express = require("express");
let router = express.Router();
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "blogs";

// 查询
router.get("/", function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      db.collection("user")
        .find({})
        .toArray(function(err, result) {
          // 返回集合中所有数据
          if (err) throw err;

          res.end(JSON.stringify(result));
          client.close();
        });
    }
  );
});

// 登录
router.put("/",function(req,res){
    console.log("收到了put请求");
})

// 注册
router.post("/", function(req, res) {
  console.log("收到了post请求");

  MongoClient.connect(
    url,
    function(err, client) {
      //数据库
      const db = client.db(dbName);

      db.collection("user")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          let id = result.length + 1;
          // todo 密码编码
          let data = {
            name: "",
            password: "",
            id
          };

          db.collection("user").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            let response = {
              ret: 0,
              message: ""
            };
            res.send(JSON.stringify(response));
            client.close();
          });
        });
    }
  );
});

module.exports = router;
