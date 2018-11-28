let express = require('express')
let router = express.Router()

router.get('/',function(req,res){
    let data = {
        username: 'this is user',
        sex: 'man',
        address: '上海'
    }
    res.end(JSON.stringify(data))
})

router.post('/',function(req,res){
    console.log('收到了post请求')
    // todo 操作mongdb
    res.send({
        'regist':{title:req.param('username')}
    })
})

module.exports = router