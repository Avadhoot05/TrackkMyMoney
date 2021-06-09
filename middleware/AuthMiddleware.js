const jwt = require('jsonwebtoken')
const User = require("../model/userSchema")



const Authenticate = async(req, res,next)=>{
    

    try {
        const tokenKey = process.env.TOKEN_KEY
        const token = req.cookies.jwtoken
        const VerifyToken = jwt.verify(token, tokenKey)
        
        const rootUser = await User.findOne({_id:VerifyToken._id,"tokens.token":token})
        
        if(rootUser){
            req.token = token
            req.rootUser = rootUser
            req.userID = rootUser._id
            next()
        }
        else{
             res.status(402).send("Unauthorized: No token found")
        }
    } catch (err) {
        res.status(401).send("Unauthorized: No token found")
        console.log(err)
    }
}


module.exports  = Authenticate