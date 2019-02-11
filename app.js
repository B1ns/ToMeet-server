const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config')

const app = express()

const PORT = process.env.PORT || 3000

const join = require('./routes/join')
const login = require('./routes/login')

app.listen(PORT, () => {
    console.log('과연 포트는 ?? :' + PORT)
})

mongoose.connect(config.mongodburi)

const db = mongoose.connection;
db.on('error', err => {
    console.error(err);
    console.log('디비가 왜 안 열릴까요 ?!')
    process.exit()
});

db.once('open', () => { 
    console.log('디비가 열렸어요 !')
})

app.use("/", join)
app.use("/", login)

app.get('/', (req, res) => {
    res.send("sasdf")
})