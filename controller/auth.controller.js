const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db.js')



class AuthController{
    async registerUser(req,res){
        const {login, password} = req.body
         const findLogin = await db.query(`select * from person WHERE login = $1`,[login])

            if (findLogin.rows[0] == undefined) {
                const salt = bcrypt.genSaltSync(10)

                const newPerson = await db.query(`INSERT INTO person (login, password) values ($1,$2) RETURNING *`,
                    [login, bcrypt.hashSync(password,salt)]
                )
                res.json(newPerson.rows[0])
            }
            else {
        res.status(409).json({
        message:"Email is used by"})
            }



    }
    async loginUser(req,res){
        const {login, password} = req.body
        const candidate = await db.query(`select * from person WHERE login = $1`,[login])
        console.log(candidate)
        if(candidate.rows[0]){

            const passwordResult = bcrypt.compareSync(password,candidate.rows[0].password)

            if(passwordResult){

            const token= jwt.sign({
                login: candidate.rows[0].login,
                userId: candidate.rows[0].id
            },'jwt',{expiresIn: 60*60})
                res.status(200).json({
                    token: `Bearer ${token}`
                })
            }else {
                res.status(401).json({
                    message: 'Passwords did not match '
                })
            }
        } else {
            res.status(404).json({
                message: 'User not found'
            })
        }
    }
}
module.exports = new AuthController()