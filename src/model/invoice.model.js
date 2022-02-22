const mongoose = require('mongoose');


const companyDetail = new mongoose.Schema({
    company: String,
    address: String,
    zip: Number,
    city: String,
    country: String,
    email: String,
});

const information = new mongoose.Schema({

   
    newdate: Date,
    due: Date,
    status: {
        type: Boolean,
        default: false
    },
    number: {
        type: Number,
        unique: true,
        required: true
    },

})

const productDetails = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    description: String,
    taxRate: Number,
    price: {
        type: Number,
        required: true
    },
    
})

const note = new mongoose.Schema({
    account_no: Number,
    IFSC_Code: Number,
    bank_name: String,
    amount: Number,
    payment_mode: String,
    notice: String,
})
const invoiceSchema = new mongoose.Schema({
    sender: {
        type: companyDetail
    },
    client: {
        type:companyDetail
    },
    information: {
        type:information
    },
    products: [{
        quantity: Number,
    description: String,
    taxRate: Number,
    price:Number
    }],
    note: {
        type:note
    }

})

const invoice = new mongoose.model('invoice', invoiceSchema);
module.exports = invoice; 