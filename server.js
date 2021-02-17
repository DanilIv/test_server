const express = require("express");
const passport = require('passport')
const postRouter = require('./routes/post.routers')
const commetnsRouter = require('./routes/commetns.routers')
const authRouter = require('./routes/auth.routers')
const bp = require('body-parser')
const PORT = process.env.PORT || 8080

const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(passport.initialize())
require('./middleware/passport')(passport)


app.use('/api', postRouter)
app.use('/api',commetnsRouter)
app.use('/api', authRouter)
app.listen(PORT,()=>console.log(`Server started on post ${PORT}`))