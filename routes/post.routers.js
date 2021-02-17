const Router = require('express')
const router = Router()
const postController = require('../controller/post.controller')

router.post('/post', postController.createPost)
router.get('/post', postController.getPostByUser )
module.exports = router