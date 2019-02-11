const router = require('express').Router()
const User = require('../databases/User')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

router.post('/join', async (req, res) => {
    try {
        if((await User.findOne({ id : req.body.id}))) {
            return res.status(404).json({message : "중복된 아이디입니다."})
        } else if((await User.findOne({ name : req.body.name}))){
            return res.status(404).json({message : "중복된 닉네임입니다."})
        }
        var tok = jwt.sign({id: target.id}, config.secret)
        const data = {id : req.body.id , pw : req.body.pw , name : req.body.name, token : tok, age : req.body.age }
        const user = await User.create(data)
        user.password = user.__v = undefined
        console.log(1234)
        return res.status(200).json({"result" : {"success" : true , "message" : "회원가입에 성공했습니다."}})
    } catch (err) {
        const { message } = err
        console.log(567)
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

module.exports = router