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
global.a = 0;
global.b = 0;

global.lowHum1 = 0;
global.lowHum2 = 0;
global.highHum1 = 0;
global.highHum2 = 0;

global.lowTem1 = 0;
global.lowTem2 = 0;
global.highTem1 = 0;
global.highTem2 = 0;

global.lowLight1 = 0;
global.lowLight2 = 0;
global.highLight1 = 0;
global.highLight2 = 0;


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
                global.a = 1
                io.emit('displaymode1', data)
                break
            case "manual":
                connection.execute('DELETE FROM mode1 LIMIT 1')
                connection.execute('INSERT INTO mode1(mode) VALUES (0)')
                io.emit('displaymode1', data)
                global.a = 0
                break
        }
    })
    socket.on('mode2', (data) => {
        //console.log(data)
        switch (data) {
            case "auto":
                connection.execute('DELETE FROM mode2 LIMIT 1')
                connection.execute('INSERT INTO mode2(mode) VALUES (1)')
                global.b = 1
                io.emit('displaymode2', data)
                break
            case "manual":
                connection.execute('DELETE FROM mode2 LIMIT 1')
                connection.execute('INSERT INTO mode2(mode) VALUES (0)')
                global.b = 0
                io.emit('displaymode2', data)
                break
        }
    })
    //NHẬN TỪ ESP// READ DIGITAL
    let houseId_ReadDigital = null
    let jsonData__ReadDigital = null
    var jsonLed
    socket.on('C-ReadDigital', (data) => {
        jsonData__ReadDigital = JSON.parse(data)
        //console.log(data);
        //console.log(JSON.parse(jsonData__ReadDigital))

        let led = (jsonData__ReadDigital.port).toString(2)
        //let led = parseInt(jsonData__ReadDigital.port, 2)
        //console.log(led)
        houseId_ReadDigital = parseInt(jsonData__ReadDigital.houseID, 10)
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
    socket.on('C-WriteDigital', (data) => {
        jsonData__ReadDigital = JSON.parse(data)
        //console.log(data);
        //console.log(jsonData__ReadDigital.response);
        let led = (jsonData__ReadDigital.port).toString(2)
        //let led = parseInt(jsonData__ReadDigital.port, 2)
        console.log(led)
        houseId_ReadDigital = parseInt(jsonData__ReadDigital.houseID, 10)
        let bitArray = led.split("")
        jsonLed = '{"bit8":' + bitArray[7] + ',"bit7":' + bitArray[6] + ',"bit6":' + bitArray[5] + ',"bit5":' + bitArray[4] + ',"bit4":' + bitArray[3] + ',"bit3":' + bitArray[2] + '}'

        switch (houseId_ReadDigital) {
            case 1:
                //connection.execute('DELETE FROM button1 LIMIT 1')
                connection.execute('INSERT INTO button1(bit8,bit7,bit6,bit5,bit4,bit3) VALUES (?,?,?,?,?,?)', [bitArray[7], bitArray[6], bitArray[5], bitArray[4], bitArray[3], bitArray[2]])
                connection.execute('DELETE FROM button1 LIMIT 1')
                io.emit('display1', jsonLed)
                break;
            case 2:
                //connection.execute('DELETE FROM button2 LIMIT 1')
                connection.execute('INSERT INTO button2(bit8,bit7,bit6,bit5,bit4,bit3) VALUES (?,?,?,?,?,?)', [bitArray[7], bitArray[6], bitArray[5], bitArray[4], bitArray[3], bitArray[2]])
                connection.execute('DELETE FROM button2 LIMIT 1')
                io.emit('display2', jsonLed)
                break;
        }
    })

    //DOC GIA TRI ADC
    var value
    //fix
    socket.on('C-ReadADC', (data) => {
        let jsonData = JSON.parse(data)
        //console.log(jsonData)
        let decNumber = jsonData.adc1
        value = (decNumber - 1450) * 100 / (650 - 1450)
        connection.execute('SELECT mode FROM mode1 ORDER BY id DESC LIMIT 1;')
            .then(([rows]) => {
                let mode = rows[0].mode;
                if (value >= global.highHum1 && mode == 1) {
                    io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO2":"1","DO3":"1","DO4":"1","DO5":"1"}}');
                    //io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO3":"0"}}');
                    //io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO4":"0"}}');
                    //io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO5":"0"}}');
                }
                else if (value < global.lowHum1 && mode == 1) {
                    io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO2":"0","DO3":"0","DO4":"0","DO5":"0"}}');
                    // io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO3":"1"}}');
                    // io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO4":"1"}}');
                    // io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO5":"1"}}');
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
        let houseID = jsonData.houseID
        //console.log(jsonData)
        //a = { "Client": { "houseID": 1, "response": "RS485", "RS485a": "aRS485 Address", "rs485d1": Data 1, "rs485d2": Data 2, ...} }
        let time = moment().format('YYYY-MM-DD HH:mm:ss')
        switch (jsonData.cmdID) {
            case 31:
                let N = jsonData.rs485d1
                let P = jsonData.rs485d2
                let K = jsonData.rs485d3
                switch (houseID) {
                    case 1:
                        break
                    case 2:
                        connection.execute('INSERT INTO rs485_npk1(time,N,P,K) VALUES (?,?,?,?)', [time, N, P, K])
                        io.emit('RS485_NPKvalue', '{"N":' + N + ',"P":' + P + ',"K":' + K + '}')
                        break
                }
                break
            case 33:
                let Hum = jsonData.rs485d1 / 10
                //console.log(Hum)
                switch (houseID) {
                    case 1:
                        break
                    case 2:
                        connection.execute('INSERT INTO rs485_hum1(time,hum) VALUES (?,?)', [time, Hum])
                        io.emit('RS485_humvalue', '{"Hum":' + Hum + '}')
                        break
                }
                connection.execute('SELECT mode FROM mode2 ORDER BY id DESC LIMIT 1;')
                    .then(([rows]) => {
                        let mode = rows[0].mode;
                        if (Hum >= global.highHum2 && mode == 1) {
                            io.emit('eventsv', '{"Client":{"houseID":2,"request":"WriteDigital","DO2":"1","DO3":"1","DO4":"1","DO5":"1"}}');
                            //io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO3":"0"}}');
                            //io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO4":"0"}}');
                            //io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO5":"0"}}');
                        }
                        else if (Hum < global.lowHum2 && mode == 1) {
                            io.emit('eventsv', '{"Client":{"houseID":2,"request":"WriteDigital","DO2":"0","DO3":"0","DO4":"0","DO5":"0"}}');
                            // io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO3":"1"}}');
                            // io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO4":"1"}}');
                            // io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO5":"1"}}');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
                break
            case 32:
                let pH = jsonData.rs485d1 / 100
                switch (houseID) {
                    case 1:
                        break
                    case 2:
                        connection.execute('INSERT INTO rs485_ph1(time,ph) VALUES (?,?)', [time, pH])
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
        switch (jsonData.i2ca) {
            case 23:
                lightI2C = (parseInt(jsonData.i2cd1.toString(16) + jsonData.i2cd2.toString(16), 16) / 1.2)
                switch (jsonData.houseID) {
                    case 1:
                        let lightI2C1 = lightI2C;
                        connection.execute('SELECT mode FROM mode1 ORDER BY id DESC LIMIT 1;')
                            .then(([rows]) => {
                                let mode = rows[0].mode;
                                if (lightI2C1 >= global.highLight1 && mode == 1) {
                                    io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO0":"0"}}');
                                }
                                else if (lightI2C1 < global.lowLight1 && mode == 1) {
                                    io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO0":"1"}}');
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                        connection.execute('INSERT INTO lighti2c1(light,time) VALUES (?,?)', [lightI2C, time])
                        io.emit('lighti2c1', '{"pH1":' + lightI2C + '}')
                        break
                    case 2:
                        let lightI2C2 = lightI2C;
                        connection.execute('SELECT mode FROM mode2 ORDER BY id DESC LIMIT 1;')
                            .then(([rows]) => {
                                let mode = rows[0].mode;
                                if (lightI2C2 >= global.highLight2 && mode == 1) {
                                    io.emit('eventsv', '{"Client":{"houseID":2,"request":"WriteDigital","DO0":"0"}}');
                                }
                                else if (lightI2C2 < global.lowLight2 && mode == 1) {
                                    io.emit('eventsv', '{"Client":{"houseID":2,"request":"WriteDigital","DO0":"1"}}');
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                        connection.execute('INSERT INTO lighti2c2(light,time) VALUES (?,?)', [lightI2C, time])
                        io.emit('lighti2c2', '{"pH2":' + lightI2C + '}')
                        break
                }
                break
            case 68:
                temI2C = (parseInt(jsonData.i2cd1.toString(16) + jsonData.i2cd2.toString(16), 16) * 175 / 65535) - 45
                humI2C = (parseInt(jsonData.i2cd4.toString(16) + jsonData.i2cd5.toString(16), 16) * 100 / 65535)
                switch (jsonData.houseID) {
                    case 1:
                        let temI2C1 = temI2C
                        connection.execute('SELECT mode FROM mode1 ORDER BY id DESC LIMIT 1;')
                            .then(([rows]) => {
                                let mode = rows[0].mode;
                                if (temI2C1 >= global.highTem1 && mode == 1) {
                                    io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO1":"0"}}');
                                }
                                else if (temI2C1 < global.lowTem1 && mode == 1) {
                                    io.emit('eventsv', '{"Client":{"houseID":1,"request":"WriteDigital","DO1":"1"}}');
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                        connection.execute('INSERT INTO tem_humi2c1(tem,hum,time) VALUES (?,?,?)', [temI2C, humI2C, time])
                        io.emit('temhumi2c1', '{"tem":' + temI2C + ',"hum":' + humI2C + '}')
                        break
                    case 2:
                        let temI2C2 = temI2C
                        connection.execute('SELECT mode FROM mode2 ORDER BY id DESC LIMIT 1;')
                            .then(([rows]) => {
                                let mode = rows[0].mode;
                                if (temI2C2 >= global.highTem2 && mode == 1) {
                                    io.emit('eventsv', '{"Client":{"houseID":2,"request":"WriteDigital","DO1":"0"}}');
                                }
                                else if (temI2C2 < global.lowTem2 && mode == 1) {
                                    io.emit('eventsv', '{"Client":{"houseID":2,"request":"WriteDigital","DO1":"1"}}');
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                        connection.execute('INSERT INTO tem_humi2c2(tem,hum,time) VALUES (?,?,?)', [temI2C, humI2C, time])
                        io.emit('temhumi2c2', '{"tem":' + temI2C + ',"hum":' + humI2C + '}')
                        break
                }
                break
        }
        io.emit('S-RequestI2C', data)
    })
    socket.on('C-ReadI2C', (data) => {
        console.log(JSON.parse(data))
    })
    socket.on('C-ScanI2C', (data) => {
        0
        console.log(JSON.parse(data))
        io.emit('GET_I2C_DEVICE', data)
    })
    // ONLINE STATUS
    socket.on('C-CheckStatus', (data) => {
        let jsonData = JSON.parse(data)
        console.log(JSON.parse(data))
        switch (jsonData.houseID) {
            case 1:
                switch (jsonData.msg) {
                    case 'Lora_Offline':
                        connection.execute('INSERT INTO status1(status) VALUES (0)')
                        break
                    case 'Lora_Online':
                        connection.execute('INSERT INTO status1(status) VALUES (1)')
                        break
                }
                break
            case 2:
                switch (jsonData.msg) {
                    case 'Lora_Offline':
                        connection.execute('INSERT INTO status2(status) VALUES (0)')
                        break
                    case 'Lora_Online':
                        connection.execute('INSERT INTO status2(status) VALUES (1)')
                        break
                }
                break
        }
        io.emit('S-status', data)

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
            io.emit(`eventsv`, data);
        });
    });
    socket.on('config', (data) => {
        console.log(JSON.parse(data))
        io.emit('eventsv', data)
    })
    socket.on('configRS485', (data) => {
        console.log(JSON.parse(data))
        io.emit('eventsv', data)
    })
    socket.on('configI2C', (data) => {
        console.log(JSON.parse(data))
        io.emit('eventsv', data)
    })
    socket.on('scan_i2c', (data) => {
        console.log(data);
        io.emit('eventsv', (data))
    })
    socket.on('RS485_value', (data) => {
        //let jsonData = JSON.parse(data)
        console.log(JSON.parse(data));
    })
    socket.on('disconnect', () => {
        console.log("disconnection");
    });
    socket.on('debug1', (data) => {
        io.emit('eventsv', data)
    })
    socket.on('getAutoValue', (data) => {
        let jsonData = JSON.parse(data)

        global.lowHum1 = jsonData.lowHum1
        global.lowHum2 = jsonData.lowHum2
        global.highHum1 = jsonData.highHum1
        global.highHum2 = jsonData.highHum2

        global.lowTem1 = jsonData.lowTem1
        global.lowTem2 = jsonData.lowTem2
        global.highTem1 = jsonData.highTem1
        global.highTem2 = jsonData.highTem2

        global.lowLight1 = jsonData.lowLight1
        global.lowLight2 = jsonData.lowLight2
        global.highLight1 = jsonData.highLight1
        global.highLight2 = jsonData.highLight2

    })
});
server.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
)
db.connect()
initWebRoute(app)
API_initWebRoute(app)