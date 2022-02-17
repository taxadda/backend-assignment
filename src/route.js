const express = require('express');
const router = express.Router();
const { createInvoice ,fetchAllInvoices,fetchLateInvoices,updateInvoice
} =  require('./controllers/invoice.controllers.js');



router.post('/create', createInvoice);
router.get('/all', fetchAllInvoices);
router.get('/late-invoices', fetchLateInvoices);
router.post('/update-invoice-status', updateInvoice);
module.exports = router;