const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const multer = require('multer')
const fs = require('fs');
const path = require('path')
const rateLimit = require("express-rate-limit")
const db = require('./DB')
const dotenv = require('dotenv')
const initWebRoute = require('./routes/route')
const http = require('http')
const { json } = require('body-parser')
const server = http.createServer(app)
const io = require('socket.io')(server);



app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config
const port = dotenv.config.port || 1234

app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')))
const limiter = rateLimit({
    // 15 minutes
    windowMs: 60 * 15 * 1000,
    // limit each IP to 100 requests per windowMs
    max: 100
});
app.use(limiter)

io.on('connection', (socket) => {
    console.log('a user connected')
    // setInterval(() => {
    //     let data = Math.floor(Math.random() * 31) + 20
    //     console.log('data1 gửi đi: ' + data)
    //     socket.emit('s-c-data1', data)
    // }, 5000)

    // setInterval(() => {
    //     let data2 = Math.floor(Math.random() * 31) + 20
    //     console.log('data2 gửi đi: ' + data2)
    //     socket.emit('s-c-data2', data2)
    // }, 5000)
    socket.on('C-ReadDigital', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-WriteDigital', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-ReadADC', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-ReadI2C', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-RequestI2C', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-ScanI2C', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-CheckStatus', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-ResponseError', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('den1on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        socket.emit('den1on', jsonData)
    })
    socket.on('den1off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        socket.emit('den1off', jsonData)
    })
    socket.on('disconnect', () => {
        console.log("disconnection");
    });
});

server.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
)
db.connect()

initWebRoute(app)