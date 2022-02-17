const fs = require('fs')
const easyinvoice = require('easyinvoice')
const path = require('path')
const generator = require('../utils/generate')
const createError = require('http-errors')
const invoiceService = require('../services/invoices.services')
const mailer = require('../services/email.services.js')
const invoiceValidator = require('../validation/invoice.validation')
exports.createInvoice = async (req, res, next) => {
  try {
    const { error } = await invoiceValidator
      .createInvoice()
      .validateAsync(req.body.data)
    if (error) {
      throw createError(422, error)
      return
    }
    const { data } = req.body
    const { sender, client, information, product, note } = data
    const invoiceNum = await invoiceService.createUniqueInvoiceNum()
    information.number = invoiceNum
    console.log(req.body.data)
    const createInvoice = await invoiceService.createInvoices(
      sender,
      client,
      information,
      product,
      note
    )
    const sendOtp = mailer.sendEmail(
      req.body.data.client.email,
      data,
      'Invoice'
    )

    if (createInvoice) {
      res.status(201).json({ message: 'Invoice Successful Created' })
    }
  } catch (err) {
    console.log('Error during creating Invoice ', err)
    next(err)
  }
}

exports.updateInvoice = async (req, res, next) => {
  try {
    const invoiceNum = req.body.number

    console.log('invoiceNum', invoiceNum)
    const updatePaidStatus = await invoiceService.updateInvoice(invoiceNum)
    if (updatePaidStatus) {
      res
        .status(200)
        .json({ message: 'Invoice Successful Updated', code: '200' })
    } else {
      res.status(401).json({ message: 'Invoice can not be updated' })
    }
  } catch (err) {
    console.log('error is ', err)
    next(err)
  }
}

exports.fetchAllInvoices = async (req, res) => {
    try {
        
        const result = await invoiceService.findAllInvoices()
        if (result) {
            console.log('result', result)
            res.status(200).json(result)
        } else {
            res.status(404).send('No data found')
        }
    } catch (err) {
        console.log('error', err);
        next(err);
    }
}

exports.fetchLateInvoices = async (req, res, next) => {
  try {
    const result = await invoiceService.fetchLateInvoices()
    if (result) {
      res.status(200).json({ data: result })
    } else {
      res.status(404).json({ message: 'No Late Invoice Found' })
    }
  } catch (err) {
      console.log("Error", err);
    next(err)
  }
}
