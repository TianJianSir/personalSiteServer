const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');
const basicPath = '/root/code';
const filePath = path.join(__dirname, '../file.json')
const versionPath = path.join(__dirname, '../version.json')


function readFile(){
    return new Promise((resolve,reject)=>{
        let components = []
        let fileObj = []

        const files = fs.readdirSync(basicPath)
        files.forEach(function (item, index) {
            let stat = fs.lstatSync( path.join(basicPath,item))
            if (stat.isDirectory() === true) {
                components.push(item)
            }
        })

        components.forEach(function (item, index) {
            let files = fs.readdirSync(path.join(basicPath,item))

            let obj = {
                name: item,
                child: []
            }

            files.forEach(function (child, index) {
                let stat = fs.lstatSync(path.join(basicPath,item+'/'+child))
                if (stat.isDirectory() === true) {
                    obj.child.push(child)
                }
            })

            fileObj.push(obj)
        })

        let str = JSON.stringify(fileObj)

        fs.writeFile(filePath,str,function(err){
            if (err) {
                reject()
            }else{
                resolve()
            }
        })
    })
}

router.get('/', function (req, res) {
    readFile().then(()=>{
        res.sendFile(filePath)
    }).catch((err)=>console.log(err))
})

router.post("/setVersion", function (req, res) {
    const {name, version} = req.body

    fs.readFile(versionPath,'utf8',function(err,data){
        var Obj = JSON.parse(data)
        Obj[name] = version
        let str = JSON.stringify(Obj)
        fs.writeFile(versionPath,str,function(err){
            let result

            if (err) {
                console.log(err)
                result = {
                    code: '-1',
                    message: 'server is error'
                }
            }else{
                result = {
                    code: '0'
                }
            }
            res.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
            res.end(JSON.stringify(result))
        })
    })

})

module.exports = router
