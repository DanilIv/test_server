const Router = require('express')
const passport = require('passport')
const router = Router()
const commentsControler = require('../controller/comments.controller')

router.post('/comment', passport.authenticate('jwt',{session:false}),commentsControler.createComment)
router.get('/comments',passport.authenticate('jwt',{session:false}), commentsControler.getCommentsByPost)
module.exports = router