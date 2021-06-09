const dotenv = require('dotenv')
const express = require('express')
var cookieParser = require('cookie-parser')
const app = express()

dotenv.config({path:'./config.env'})
const port = process.env.PORT || 3000

app.use(cookieParser())

require('./db/conn')

app.use(express.json())
app.use(require('./router/auth'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"))
}

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})