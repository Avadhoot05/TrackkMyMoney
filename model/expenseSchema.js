const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    userid:{
        type:Object,
        required:true
    },
    date:{
        date:{type: Number, required:true},
        month:{type: Number, required:true},
        year:{type: Number, required:true} 
    },
    itemname:{
        type: String,
    },
    itemtype:{
        type: String,
        required:true
    },
    currency:{
        type: String,
        required:true
    },
    amount:{
        type: String,
        required:true
    }
})




const Expense =  mongoose.model('EXPENSE',expenseSchema)

module.exports = Expense


