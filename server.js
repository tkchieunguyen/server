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
const { stringify } = require('querystring')
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
    // socket.on('read digital', (data) => {
    //     let jsonData = JSON.parse(data)
    //     //console.log(jsonData.houseID);
    //     switch (jsonData.houseID.toString()) {
    //         case "1":
    //             io.emit('display button house 1', jsonData)
    //             break;
    //         case "2":
    //             io.emit('display button house 2', jsonData)
    //             break;
    //     }

    // })
    // setInterval(() => {
    //     let data = Math.floor(Math.random() * 31) + 20
    //     //let data = "hiếu"
    //     console.log('data1 gửi đi: ' + data)
    //     socket.emit('s-c-data10', data.toString())
    // }, 1)

    // setInterval(() => {
    //     let data2 = Math.floor(Math.random() * 31) + 20
    //     console.log('data2 gửi đi: ' + data2)
    //     socket.emit('s-c-data2', data2)
    // }, 5000)

    //NHẬN TỪ ESP// READ DIGITAL
    let houseId_ReadDigital = null
    let jsonData__ReadDigital = null
    socket.on('C-ReadDigital', (data) => {
        jsonData__ReadDigital = JSON.parse(data)
        console.log(data);
        //console.log(JSON.parse(jsonData__ReadDigital))
        houseId_ReadDigital = parseInt(jsonData__ReadDigital.HouseID, 10)
        //console.log(houseId)
    })
    setInterval(() => {
        switch (houseId_ReadDigital) {
            case 1:
                //console.log(houseId)
                io.emit('display1', JSON.stringify(jsonData__ReadDigital))
                break;
            case 2:
                //console.log(houseId)
                io.emit('display2', JSON.stringify(jsonData__ReadDigital))
                break;
        }
    }, 1)
    socket.on('C-ReadADC', (data) => {
        console.log(data)
    })
    socket.on('C-ReadI2C', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-RequestI2C', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-ScanI2C', (data) => {
        console.log(JSON.parse(data))
        io.emit('GET_I2C_DEVICE', JSON.parse(data))
    })
    socket.on('C-CheckStatus', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })
    socket.on('C-ResponseError', (data) => {
        console.log(JSON.parse(data.substring(0, data.lastIndexOf("[CRC 32 BIT]"))))
    })

    // NHẬN TỪ USER// WRITE DIGITAL
    const events = [
        'den1on', 'den1off',
        'den2on', 'den2off',
        'den3on', 'den3off',
        'den4on', 'den4off',
        'den5on', 'den5off',
        'den6on', 'den6off',
        'den7on', 'den7off',
        'den8on', 'den8off',
        'den9on', 'den9off',
        'den10on', 'den10off',
        'den11on', 'den11off',
        'den12on', 'den12off',];
    events.forEach(event => {
        socket.on(event, (data) => {
            console.log(data);
            io.emit(`${event}sv`, data);
        });
    });
    socket.on('config', (data) => {
        console.log(data)
    })
    socket.on('scan_i2c', (data) => {
        console.log(data);
        io.emit('scan_i2csv', (data))
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