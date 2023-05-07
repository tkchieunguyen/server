const controller = require('../controller/APIController')
const express = require('express')
let apiRouter = express.Router()
const API_initWebRoute = (app) => {
    apiRouter.get('/user', controller.getUser)
    apiRouter.get('/adc1Start', controller.getADCStart)
    apiRouter.get('/adc1Active', controller.getADCActive)
    apiRouter.get('/Rs485Start', controller.getRS485Start)
    apiRouter.get('/Rs485Active', controller.getRS485Active)
    apiRouter.get('/getButton', controller.getButton)
    return app.use('/api/', apiRouter)
}
module.exports = API_initWebRoute