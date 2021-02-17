const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../db.js')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt'
}

module.exports = passport =>{
    passport.use(
        new JwtStrategy(options,async (payload,done)=> {
            try {

            const user = await db.query(`select * from person WHERE id = $1`,[payload.userId])


            if(user.rows[0]){
                done(null,[user.rows[0].login,user.rows[0].id])

            }else {
                done(null,false)
            }
            } catch (e){
                console.log(e)
            }
        })
    )
}
