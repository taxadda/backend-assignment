const joi = require('@hapi/joi');


const productSchema = joi.object({
    quantity: joi.number().required(),
    description: joi.string(),
    taxRate: joi.number(),
    price: joi.number().required()
    })


exports.createInvoice = () => {
    const schema = joi.object({
        sender: joi.object({
            company: joi.string().max(20),
            address: joi.string().max(30),
            zip: joi.number(),
            city: joi.string().max(10),
            country: joi.string().max(14)
        }),
        client:joi.object({
            company: joi.string().max(20),
            address: joi.string().max(30),
            zip: joi.number(),
            city: joi.string().max(10),
            country: joi.string().max(14),
            email: joi.string().max(50)
        }),
        information: joi.object({
            newDate: joi.date(),
            due: joi.date()

        }),
        products: joi.array().items(productSchema),
        note: joi.object({
             account_no: joi.number(),
            IFSC_Code: joi.number(),
            bank_name: joi.string(),
            amount: joi.number(),
            payment_mode: joi.string(),
            notice: joi.string()
        })
    }).options({ abortEarly: false })
    return schema;
}