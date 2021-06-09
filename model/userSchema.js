
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    pswd:{
        type: String,
        required:true
    },
    cpswd:{
        type: String,
        required:true
    },
    tokens:[
        {
        token: {
            type:String,
            required:true
            }
        }
    ]
})

//Password Hashing
userSchema.pre('save',async function(next){
    if(this.isModified('pswd')){
        this.pswd = await bcrypt.hash(this.pswd, 12);
        this.cpswd = await bcrypt.hash(this.cpswd, 12);
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    try {
        const tokenKey = process.env.TOKEN_KEY
        let curr_token = jwt.sign({_id:this._id},tokenKey)

        this.tokens = this.tokens.concat({token:curr_token})
        await this.save()
        return curr_token

    } catch (error) {
        console.log(error)
        
    }
}

const User =  mongoose.model('USER',userSchema)

module.exports = User


