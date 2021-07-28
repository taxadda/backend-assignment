const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/InvoiceDB'
const app = express()
const schedule = require('node-schedule')
const invoices = require('./model/schema')

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
const con = mongoose.connection

con.on('open', function(){
    console.log('connectod to DB.....')
})

app.use(express.json())

const indexRoute = require('./routes/invoice') 
app.use('/invoice', indexRoute)

const job = schedule.scheduleJob({hour:01, minute:01} ,async() =>{
    var dat = new Date()   
    try{
            const s = await invoices.find({ $and: [{status:{$ne:'paid'}}, {status:{$ne:'Paid'}}, {due: {$lt: dat}}]});
            for(let k in s){
                s[k].status = 'late';
                s[k].markModified('status');
                s[k].save()
            }
   }catch(err){
       console.log('Error ' + err) 
   }
    console.log('\n Late Invoices Updated \n')
})

app.listen(9001, () => {
    console.log('Server Started ')
})
