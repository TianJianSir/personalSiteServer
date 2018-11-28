let express = require('express')
let router = express.Router()

router.get('/',function(req,res){
    let data = {
        username: 'this is post',
        sex: 'man',
        address: '上海'
    }
    res.end(JSON.stringify(data))
})

module.exports = router