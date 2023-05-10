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
const API_initWebRoute = require('./routes/api')
const server = http.createServer(app)
const io = require('socket.io')(server);
const { connection } = require('./MySQL')
const moment = require('moment')



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
    windowMs: 15 * 60 * 1000,
    // limit each IP to 5000 requests per Window each 15 Minute 
    max: 5000
});
app.use(limiter)

io.on('connection', (socket) => {
    console.log('a user connected')
    //NHẬN TỪ ESP// READ DIGITAL
    let houseId_ReadDigital = null
    let jsonData__ReadDigital = null
    var jsonLed
    socket.on('C-ReadDigital', (data) => {
        jsonData__ReadDigital = JSON.parse(data)
        console.log(data);
        //console.log(JSON.parse(jsonData__ReadDigital))
        let led = parseInt(jsonData__ReadDigital.data, 16).toString(2)
        console.log(led)
        houseId_ReadDigital = parseInt(jsonData__ReadDigital.HouseID, 10)
        let bitArray = led.split("")
        jsonLed = '{"bit8":' + bitArray[7] + ',"bit7":' + bitArray[6] + ',"bit6":' + bitArray[5] + ',"bit5":' + bitArray[4] + ',"bit4":' + bitArray[3] + ',"bit3":' + bitArray[2] + '}'
        switch (houseId_ReadDigital) {
            case 1:
                connection.execute('INSERT INTO button1(bit8,bit7,bit6,bit5,bit4,bit3) VALUES (?,?,?,?,?,?)', [bitArray[7], bitArray[6], bitArray[5], bitArray[4], bitArray[3], bitArray[2]])
                io.emit('display1', jsonLed)
                break;
            case 2:
                connection.execute('INSERT INTO button2(bit8,bit7,bit6,bit5,bit4,bit3) VALUES (?,?,?,?,?,?)', [bitArray[7], bitArray[6], bitArray[5], bitArray[4], bitArray[3], bitArray[2]])
                io.emit('display2', jsonLed)
                break;
        }

    })
    //DOC GIA TRI ADC
    var value
    socket.on('C-ReadADC', (data) => {
        let jsonData = JSON.parse(data)
        let msb = jsonData.data_1_MSB
        let lsb = jsonData.data_1_LSB
        let hexString = msb + lsb
        let decNumber = parseInt(hexString, 16);
        value = (decNumber - 1450) * 100 / (650 - 1450)
        if (value >= 100) {
            value = 100
        }
        if (value <= 0) {
            value = 8
        }
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        connection.execute('INSERT INTO adc_1(value,time) VALUES (?,?)', [value, time])
        io.emit('S-ReadADC', data)
    })

    //DOC GIA TRI RS485
    socket.on('C-ReadRS485', (data) => {
        let jsonData = JSON.parse(data)
        //console.log(jsonData)
        let houseID = jsonData.HouseID
        let N = parseInt(jsonData.data_1 + jsonData.data_2, 16)
        let P = parseInt(jsonData.data_3 + jsonData.data_4, 16)
        let K = parseInt(jsonData.data_5 + jsonData.data_6, 16)
        let Hum = parseInt(jsonData.data_7 + jsonData.data_8, 16) / 10
        let pH = parseInt(jsonData.data_9 + jsonData.data_10, 16) / 10
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        //console.log(N + "  " + P + "  " + K + "  " + Hum + "  " + pH)
        switch (houseID) {
            case '1':
                break
            case '2':
                connection.execute('INSERT INTO rs485_2(time,N,P,K,humdity,pH) VALUES (?,?,?,?,?,?)', [time, N, P, K, Hum, pH])
                io.emit('RS485_value', '{"N":' + N + ',"P":' + P + ',"K":' + K + ',"Hum":' + Hum + ',"pH":' + pH + '}')
                break
        }

    })

    socket.on('C-ReadI2C', (data) => {
        console.log(JSON.parse(data))
        let jsonData = JSON.parse(data)
        let temI2C
        let humI2C
        let lightI2C
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        switch (jsonData.lenght) {
            case '3':
                lightI2C = (parseInt(jsonData.data_1 + jsonData.data_2, 16) / 1.2)
                switch (jsonData.HouseID) {
                    case '1':
                        connection.execute('INSERT INTO lighti2c1(light,time) VALUES (?,?)', [lightI2C, time])
                        break
                    case '2':
                        connection.execute('INSERT INTO lighti2c2(light,time) VALUES (?,?)', [lightI2C, time])
                        break
                }

                break
            case '5':
                temI2C = (parseInt(jsonData.data_1 + jsonData.data_2, 16) * 175 / 65535) - 45
                humI2C = (parseInt(jsonData.data_3 + jsonData.data_4, 16) * 100 / 65535)
                switch (jsonData.HouseID) {
                    case '1':
                        connection.execute('INSERT INTO tem_humi2c1(tem,hum,time) VALUES (?,?,?)', [temI2C, humI2C, time])
                        break
                    case '2':
                        connection.execute('INSERT INTO tem_humi2c2(tem,hum,time) VALUES (?,?,?)', [temI2C, humI2C, time])
                        break
                }
                break
        }
        io.emit('S-ReadI2C', data)
    })
    socket.on('C-RequestI2C', (data) => {
        console.log(JSON.parse(data))
    })
    socket.on('C-ScanI2C', (data) => {
        //console.log(JSON.parse(data))
        io.emit('GET_I2C_DEVICE', data)
    })
    // ONLINE STATUS
    socket.on('C-CheckStatus', (data) => {
        console.log(JSON.parse(data))
    })
    socket.on('C-ResponseError', (data) => {
        console.log(JSON.parse(data))
    })
    socket.on('C-ResponseTimer', (data) => {
        console.log(JSON.parse(data))
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
        //console.log(data)
        io.emit('timerADC', data)
    })
    socket.on('configRS485', (data) => {
        console.log(JSON.parse(data))
        io.emit('timerRS485', data)
    })
    socket.on('configI2C', (data) => {
        console.log(JSON.parse(data))
        io.emit('timerI2C', data)
    })
    socket.on('scan_i2c', (data) => {
        //console.log(data);
        io.emit('scan_i2csv', (data))
    })
    socket.on('RS485_value', (data) => {
        //let jsonData = JSON.parse(data)
        console.log(JSON.parse(data));
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
API_initWebRoute(app)