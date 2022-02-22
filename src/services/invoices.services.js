const mongoose = require('mongoose');
const invoiceSchema = require('../model/invoice.model');
const generator = require('../utils/generate');
const createError = require('http-errors');
const moment = require('moment');

exports.createInvoices = async (sender, client, information, product, note) => {
    try {
        
        var newDate = new Date(information.due);
        information.due = newDate;
        const invoiceData = new invoiceSchema({
            sender,
            client,
            information,
            product,
            note
        })
        var isErr = false;
        invoiceData.save(function (err, result) {
            if (err) {
                console.log("error during creating invoice", err);
                isErr = true;
                return;
            } else {
                console.log("invoice created", result);
            }
        })
        if (isErr) {
            throw createError(500, "Internal Server Error");
            return false;
        }
        return true;
    
    }
    catch (err) {
        console.log("Error in creating invoice", err);
        throw err;
    }
}

exports.createUniqueInvoiceNum = async () => {
    try {
        var invoiceNum = await generator.getRandomId();
        console.log("invoice Num", invoiceNum);
        var isUnique = await invoiceSchema.findOne({ "information.number": invoiceNum });
        while (isUnique) {
            console.log("invoice", isUnique);
            invoiceNum = await generator.getRandomId();
            isUnique = await invoiceSchema.findOne({ 'information.number': invoiceNum })
        }
        return invoiceNum;
   
    }
    catch (err) {
        throw err;
    }
    
}
exports.updateInvoice = async (invoiceNum) => {
    try {
            
        console.log("invoice to update");
        const result = await invoiceSchema.updateOne({ "information.number": invoiceNum }, {
            $set: {
                "information.status": true
            }
        });
        if (result.n && result.nModified) {
            console.log('User Invoice status changed to true')
            return true
        }
        else if (!result.n) {
            console.log('No Invoice Found with this number')
            throw createError(404, "No Invoice Found with this Number"); 
    
        }
       
    }

catch (err) {
        console.log('Error during updating invoice: ' + err);
        throw err;
}
    
}
exports.findAllInvoices = async () => {
    try {
        
        const list = await invoiceSchema.find({});
        return list;
    } catch (err) {
        console.log("Error during fetching all list", err);
        throw createError(500,"Internal Server Error");
    }

}

exports.fetchLateInvoices = async () => {
    try {
        var d = new Date();
        console.log("date is", d);
        const result = await invoiceSchema.find({ "information.due": { $lte: d } });
        console.log("result is", result);
        if (!result) {
            return false;
        }

        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}