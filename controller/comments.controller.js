const db = require('../db.js')
const jwt = require('jsonwebtoken')

class CommentsController{
    async createComment(req,res){
        const {text_comments, post_id} = req.body
        const token = req.headers.authorization
        const user_id =  jwt.decode(token.replace("Bearer ",'')).userId
        const newComment = db.query(`INSERT INTO comments (text_comments, post_id,user_id ) values ($1,$2,$3) RETURNING *`,[text_comments, post_id,user_id])
        res.json(newComment.rows)
    }
    async getCommentsByPost(req,res) {
        const id = req.query.id

        const comments = await db.query(`select * from comments WHERE post_id = $1`,[id])
        res.json(comments.rows[0])
    }
}
module.exports = new CommentsController()