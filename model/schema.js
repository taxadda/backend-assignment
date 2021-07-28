const { Decimal128 } = require('bson')
const mongoose = require('mongoose')
const { mainModule } = require('process')
const internal = require('stream')

const invoiceSchema = new mongoose.Schema({

    invoiceId: {
        type: Number,
        required: true
    },
    lineItems: {
        type: [],
        required: true 
    },
    
    notes: String,
    due: {   
        type: Date,  
        required: true 
    },
    status: {
        type: String,
        required: true,
        default: "due"
    }


})
module.exports = mongoose.model('invoices',invoiceSchema)