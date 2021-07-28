const express = require('express')
const route = express.Router()
const invoices = require('../model/schema')
const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cyberkitanu@gmail.com',
        pass: 'Abhishek@0907'
    }
})

route.get('/all', async(req,res) =>{
   
    try{
            const a = await invoices.find()
            res.json(a)
   }catch(err){
       res.send('Error ' + err) 
   }
    console.log('Get Request')
})

route.get('/find', async(req,res) =>{   
    try{
            const s = await invoices.findById(req.query.id)
            res.json(s)
   }catch(err){
       res.send('Error ' + err) 
   }
    console.log('Get Request - id')
})

route.get('/late', async(req,res) =>{   
    try{
            const s = await invoices.find({status:"late"})
            res.json(s)
   }catch(err){
       res.send('Error ' + err) 
   }
    console.log('Get Request - late')
})

route.patch('/updateStatus', async(req,res) =>{   
    try{
            const s = await invoices.findById(req.query.id)
            s.status = req.query.update
            const a1 = await s.save() 
            res.json(a1)
   }catch(err){
       res.send('Error ' + err) 
   }
    console.log('Patch Request')
})


route.get('/mailInvoice', async(req,res) =>{   
    console.log('Email Request')    
    try{
        const s = await invoices.findById(req.query.id)
    const mailOptions = {
        from: 'cyberkitanu@gmail.com',
        to: req.query.email,
        subject: 'Invoice for purchase vide invoice id: '+req.query.id,
        text: 'Please find the attached Invoice for your reference and pay the amount as instructed in notes.\n'+s
    }
        transport.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error)
                res.send(error)
            }else{
                console.log('Email sent: '+ info.response)
                res.send('Email sent: '+ info.response)
                }
            })
        }catch(err){
            res.send('Error ' + err)
        } 
})

route.post('/', async(req,res) =>{
    const i = new invoices

    i.invoiceId = req.body.invoiceId,
    i.lineItems = (req.body.lineItems),
    i.notes = req.body.notes,
    i.status = req.body.status,
    i.due = req.body.due
    try{
        const a1 = await i.save()
        res.json(a1)
    }catch(err){
        res.send('Error '+ err)
    }
})

module.exports = route