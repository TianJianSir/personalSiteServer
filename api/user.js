let express = require('express')
let router = express.Router()
const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'blogs';

router.get('/',function(req,res){
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
       
        const db = client.db(dbName);
       
        db.collection("user"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(typeof result)
            
            res.end(JSON.stringify(result))
            client.close();
        });
      });
})

router.post('/',function(req,res){
    console.log('收到了post请求')
    // todo 操作mongdb
    res.send({
        'regist':{title:req.param('username')}
    })
})

module.exports = router