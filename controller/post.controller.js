const db = require('../db.js')
const jwt = require('jsonwebtoken')

class PostController{
    async createPost(req,res){
        const token = req.headers.authorization

        const user_id =  jwt.decode(token.replace("Bearer ",'')).userId
        const {title, content,  date_post} = req.body
        const newPost = db.query(`INSERT INTO post (title, content, user_id,date_post) values ($1,$2,$3,$4) RETURNING *`,[title,content,user_id,date_post])
        res.json(newPost.rows)
    }
    async getPostByUser(req,res) {
        const id = req.query.id
        const posts = await db.query(`select * from post WHERE user_id = $1`,[id])
        res.json(posts.rows)
    }
}

module.exports = new PostController()