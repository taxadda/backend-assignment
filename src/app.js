const express = require('express');
const app = express();
const route = require('./route.js');
const createError = require('http-errors');
require('dotenv').config();
require('./config').connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Adding Swagger



app.use('/', route);

app.use((req, res, next) => {
    next(createError.NotFound());
})

app.use((err, req, res, next) => {
    const errorType = createError.isHttpError(err)
if (!errorType) {
  console.log(`Programatic Error, Shutting down due to ${err.stack}`)
  process.exit(1)
}

    res.status(err.status || 500)
res.json({
  error: {
    status: err.status || 500,
    message: err.message
  }
})


})
const Port = process.env.PORT || 8080;
app.listen(Port,() => {
    console.log(`Server Running on PORT ${Port}`);
})



process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2')
})

process.on('SIGINT', function () {
  process.kill(process.pid, 'SIGINT')
})
