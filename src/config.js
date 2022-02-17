const mongoose = require('mongoose')
// const logger = require('./logger')
require(`dotenv`).config()

exports.connect = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
            useCreateIndex: true
        })
    .then(() => {
        // logger.info(`Mongoose server listening`)
        console.log("Mongoose server listening");
    })
    .catch(err => {
        console.log("Error while connecting", err);
        // logger.error(`Can not Connect ${err}`)
    })

    var db = mongoose.connection

    db.on('disconnected', () => {
        //   logger.info('Mongoose connection is disconnected.')
    })

    process.on('SIGINT', async () => {
        await mongoose.connection.close()
        process.exit(0)
    })
}
