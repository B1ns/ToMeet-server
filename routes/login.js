const router = require('express').Router()
const User = require('../databases/User')

router.post('/login', async (req, res) => {
    try {
        var target = await User.findOne({id : req.body.id, pw : req.body.pw})
        if(!target) {
            console.log('1234')
            return res.status(404).json({message : "로그인에 실패하였습니다."})
            
        }
        if(!req.body.pw === target.pw) {
            console.log('567')
            return res.status(404).json({message : "로그인에 실패하였습니다."})
        }
        return res.status(200).json({"result": {"success" : true, "message" : "로그인에 성공하셨습니다.", "token" : token, "name" : target.name}})
    }catch(err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false , message}})
    }
})

module.exports = router