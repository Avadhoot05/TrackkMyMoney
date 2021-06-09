
const express = require('express')
const mongoose = require('mongoose');

const router = express.Router()
const bcrypt = require('bcryptjs')
const authMiddleware = require('../middleware/AuthMiddleware')

require("../db/conn")
const User = require('../model/userSchema')
const Expense = require('../model/expenseSchema')
const { json } = require("express")



router.post('/create',async (req,res)=>{
    const {name, email, pswd, cpswd} = req.body
    
    if(name==="" || email==="" || pswd==="" || cpswd==="" || pswd!=cpswd){
        console.log("Here")
        return res.status(422).json({msg:"fill the details correctly"})

    }

    try{
        const isUserExists = await User.findOne({email})

        if(isUserExists) 
            return res.status(420).json({msg:"User already exists"})
        
        const user = new User({name, email, pswd, cpswd})
        
        const isUserCreated = await user.save()
        if(isUserCreated)
            res.status(200).json({msg:"Registration Successful"})
    } 
    catch (error) {
        res.status(500).json({msg:"Registration Failed"})
    }
})


router.post('/signin',async (req, res)=>{
    const {email, pswd} = req.body

    //check if user has entered all the details
    if (!email || !pswd) return res.status(400).json({error:"Invalid Credentials"})

    const userLogin = await User.findOne({email})

    //check is email exists in databse
    if(userLogin){

        const token = await userLogin.generateAuthToken()

        await res.cookie("jwtoken",token,{
            expires: new Date(Date.now + (10*24*60*60*1000)),
            httpOnly:true
        })

        //check is email and pswd matched or not
        const isMatched = await bcrypt.compare(pswd, userLogin.pswd)
        isMatched ? res.status(200).send(userLogin): res.status(420).json({error:"Email and password does not match"})
    }
    else res.status(400).json({error:"Invalid Credentials"})
})


router.post('/expenseslist',async (req,res)=>{
    const d = new Date(req.body.datepicker)
    const type = req.body.type
    const filter = req.body.filter
    const userID = mongoose.Types.ObjectId(req.body.UserID)
    var obj=null
//-------------------------------------------
console.log(`--${filter.date}--${filter.month}--${filter.year}--${filter.type}`)
    // console.log(`date--${date}|| Month--${month} || type--${type} || Year--${year}`)
    if(filter.date) {
        console.log("Only Date")
        obj = type? {userid:userID,"date.date":d.getDate(),"date.month":d.getMonth()+1,"date.year":d.getFullYear(),itemtype:type}
        :{userid:userID,"date.date":d.getDate(),"date.month":d.getMonth()+1,"date.year":d.getFullYear()}
    }
    else if(filter.month){
        console.log("Only month")
        obj = type?{userid:userID,"date.month":d.getMonth()+1,"date.year":d.getFullYear(),itemtype:type}
        :{userid:userID,"date.month":d.getMonth()+1,"date.year":d.getFullYear()}
    }
    
    else if(filter.year) {
        console.log("Only year")
        obj = type?{userid:userID,"date.year":d.getFullYear(),itemtype:type}
        :{userid:userID,"date.year":d.getFullYear()}
    }
    
    else if(filter.type) {
        console.log("Only type")
        obj = {userid:userID,itemtype:type}
    }

    else{
        console.log("else")
        obj = {userid:userID,"date.month":new Date().getMonth()+1}
    } 
    

    const filteredExpenses = await Expense.find(obj)
    // console.log(`Filtered--${filteredExpenses}`)
    console.log("--------------------------------------------")
    
    filteredExpenses? res.status(200).send(filteredExpenses):res.status(200).send("No matches")
})


router.post('/expensesadd', async (req,res)=>{
    try {

            const {userID, date, itemname, itemtype, currency,amount} = req.body
            const d = new Date(date)

            // console.log(`--${userID}--${d.getDate()}--${d.getMonth()+1}--${d.getFullYear()}--${itemname}--${itemtype}--${amount}`)
            
            if(itemname==="" || itemtype==="" || amount==="")
                return res.status(421).json({msg:"All fields are required"})

            const expense = new Expense({userid:mongoose.Types.ObjectId(userID),"date.date":d.getDate(), "date.month":d.getMonth()+1, "date.year":d.getFullYear(), itemname, itemtype, currency, amount})
    
            const isexpenseAdded = await expense.save()
            if(isexpenseAdded)
                res.status(200).json({msg:"Added Sucessfully"})
        
    } catch (err) {
        res.status(401).send("Unauthorized: No token found")
        console.log(err)
    }
})


router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send("User Logout")
})
    


module.exports = router