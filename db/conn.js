const mongoose = require('mongoose')


const DBurl = process.env.DATABASE

mongoose.connect(DBurl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false})
  .then(()=>console.log('Connection successful'))
  .catch(err=>console.log(err))