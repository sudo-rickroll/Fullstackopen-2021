const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const routers = require('./controllers/users')
const logger = require('./utils/logger')
const app = express()

mongoose.connect(config.url).then(() => logger.log('Connected to database')).catch(error => logger.log('Error connecting to database: ', error.message))

app.use(cors())
app.use(express.static('./build'))
app.use(express.json())
app.use(middleware.morganMiddleware)
app.use('/api/persons', routers, middleware.unknownHandlerMiddleware, middleware.errorHandlerMiddleware)

module.exports = app