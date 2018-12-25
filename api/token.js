let express = require('express')
let router = express.Router()

router.get('/', function (req, res) {
    let data = {
        token: 'this is token'
    }
    res.end(JSON.stringify(data))
})

module.exports = router
