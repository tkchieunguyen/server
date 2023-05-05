const controller = require('../controller/APIController')
const express = require('express')
let apiRouter = express.Router()
const API_initWebRoute = (app) => {
    apiRouter.get('/user', controller.getUser)
    apiRouter.get('/adc1Start', controller.getADCStart)
    apiRouter.get('/adc1Active', controller.getADCActive)
    return app.use('/api/', apiRouter)
}
module.exports = API_initWebRoute