let express = require('express')
let router = express.Router()
const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'blogs';

router.get('/',function(req,res){
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
       
        const db = client.db(dbName);
        console.log(db)
       
        client.close();

        let data = {
            username: 'this is user',
            sex: 'man',
            address: '上海'
        }
        res.end(JSON.stringify(data))
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