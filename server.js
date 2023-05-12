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
    // limit each IP to 10000 requests per Window each 15 Minute 
    max: 10000
});
app.use(limiter)

io.on('connection', (socket) => {
    console.log('a user connected')

    //SET MODE
    socket.on('mode1', (data) => {
        //console.log(data)
        switch (data) {
            case "auto":
                connection.execute('DELETE FROM mode1 LIMIT 1')
                connection.execute('INSERT INTO mode1(mode) VALUES (1)')
                break
            case "manual":
                connection.execute('DELETE FROM mode1 LIMIT 1')
                connection.execute('INSERT INTO mode1(mode) VALUES (0)')
                break
        }
    })
    socket.on('mode2', (data) => {
        //console.log(data)
        switch (data) {
            case "auto":
                connection.execute('DELETE FROM mode2 LIMIT 1')
                connection.execute('INSERT INTO mode2(mode) VALUES (1)')
                break
            case "manual":
                connection.execute('DELETE FROM mode2 LIMIT 1')
                connection.execute('INSERT INTO mode2(mode) VALUES (0)')
                break
        }
    })

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
                connection.execute('DELETE FROM button1 LIMIT 1')
                connection.execute('INSERT INTO button1(bit8,bit7,bit6,bit5,bit4,bit3) VALUES (?,?,?,?,?,?)', [bitArray[7], bitArray[6], bitArray[5], bitArray[4], bitArray[3], bitArray[2]])
                io.emit('display1', jsonLed)
                break;
            case 2:
                connection.execute('DELETE FROM button2 LIMIT 1')
                connection.execute('INSERT INTO button2(bit8,bit7,bit6,bit5,bit4,bit3) VALUES (?,?,?,?,?,?)', [bitArray[7], bitArray[6], bitArray[5], bitArray[4], bitArray[3], bitArray[2]])
                io.emit('display2', jsonLed)
                break;
        }
    })
    //DOC GIA TRI ADC
    var value
    //fix
    socket.on('C-ReadADC', (data) => {
        let jsonData = JSON.parse(data)
        let decNumber = jsonData.adc1
        value = (decNumber - 1450) * 100 / (650 - 1450)
        connection.execute('SELECT mode FROM mode1 ORDER BY id DESC LIMIT 1;')
            .then(([rows]) => {
                let mode = rows[0].mode;
                // Tiếp tục sử dụng biến mode ở đây
                console.log(mode)
                if (value >= 50 && mode == 1) {
                    io.emit('den3onsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO2":"0"}}');
                    io.emit('den4onsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO3":"0"}}');
                    io.emit('den5onsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO4":"0"}}');
                    io.emit('den6onsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO5":"0"}}');
                }
                else if (value < 50 && mode == 1) {
                    io.emit('den3offsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO2":"1"}}');
                    io.emit('den4offsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO3":"1"}}');
                    io.emit('den5offsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO4":"1"}}');
                    io.emit('den6offsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO5":"1"}}');
                }
            })
            .catch(error => {
                console.log(error)
            });



        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        connection.execute('DELETE FROM adc_1 LIMIT 1')
        connection.execute('INSERT INTO adc_1(value,time) VALUES (?,?)', [value, time])

        io.emit('S-ReadADC', data)
    })
    //DOC GIA TRI RS485
    socket.on('C-ReadRS485', (data) => {
        let jsonData = JSON.parse(data)
        let houseID = jsonData.HouseID
        //console.log(jsonData)
        //a = { "Client": { "houseID": 1, "response": "RS485", "RS485a": "aRS485 Address", "rs485d1": Data 1, "rs485d2": Data 2, ...} }
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        switch (jsonData.RS485a) {
            case 1:
                let N = jsonData.data_1
                let P = jsonData.data_2
                let K = jsonData.data_3
                switch (houseID) {
                    case '1':
                        break
                    case '2':
                        connection.execute('INSERT INTO rs485_npk1(time,N,P,K) VALUES (?,?,?,?)', [time, N, P, K])
                        io.emit('RS485_NPKvalue', '{"N":' + N + ',"P":' + P + ',"K":' + K + '}')
                        break
                }
                break
            case 2:
                let Hum = jsonData.data_1 / 10
                switch (houseID) {
                    case '1':
                        break
                    case '2':
                        connection.execute('INSERT INTO rs485_hum1(time,hum) VALUES (?,?)', [time, Hum])
                        io.emit('RS485_humvalue', '{""Hum":' + Hum + '}')
                        break
                }
                break
            case 3:
                let pH = jsonData.data_1 / 10
                switch (houseID) {
                    case '1':
                        break
                    case '2':
                        connection.execute('INSERT INTO rs485_ph1(time,) VALUES (?,?)', [time, pH])
                        io.emit('RS485_phvalue', '{"pH":' + pH + '}')
                        break
                }
                break
        }


    })
    socket.on('C-RequestI2C', (data) => {
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
    socket.on('C-ReadI2C', (data) => {
        console.log(JSON.parse(data))
    })
    socket.on('C-ScanI2C', (data) => {
        console.log(JSON.parse(data))
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
        console.log(JSON.parse(data))
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
        console.log(data);
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