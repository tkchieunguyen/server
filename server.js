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

    // NHẬN TỪ USER// WRITE DIGITAL
    socket.on('den1on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den1onsv', jsonData)
        io.emit('den1onsv', data)
    })
    socket.on('den1off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den1offsv', jsonData)
        io.emit('den1offsv', data)
    })
    socket.on('den2on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den2onsv', jsonData)
        io.emit('den2onsv', data)
    })
    socket.on('den2off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den2offsv', jsonData)
        io.emit('den2offsv', data)
    })
    socket.on('den3on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den3onsv', jsonData)
        io.emit('den3onsv', data)
    })
    socket.on('den3off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den3offsv', jsonData)
        io.emit('den3offsv', data)
    })
    socket.on('den4on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den2onsv', jsonData)
        io.emit('den4onsv', data)
    })
    socket.on('den4off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den2offsv', jsonData)
        io.emit('den4offsv', data)
    })
    socket.on('den5on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den2onsv', jsonData)
        io.emit('den5onsv', data)
    })
    socket.on('den5off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den2offsv', jsonData)
        io.emit('den5offsv', data)
    })
    socket.on('den6on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den2onsv', jsonData)
        io.emit('den6onsv', data)
    })
    socket.on('den6off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den2offsv', jsonData)
        io.emit('den6offsv', data)
    })
    socket.on('den7on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den3onsv', jsonData)
        io.emit('den7onsv', data)
    })
    socket.on('den7off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den3offsv', jsonData)
        io.emit('den7offsv', data)
    })
    socket.on('den8on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den3onsv', jsonData)
        io.emit('den8onsv', data)
    })
    socket.on('den8off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den3offsv', jsonData)
        io.emit('den8offsv', data)
    })
    socket.on('den9on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den3onsv', jsonData)
        io.emit('den9onsv', data)
    })
    socket.on('den9off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den3offsv', jsonData)
        io.emit('den9offsv', data)
    })
    socket.on('den10on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den3onsv', jsonData)
        io.emit('den10onsv', data)
    })
    socket.on('den10off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den3offsv', jsonData)
        io.emit('den10offsv', data)
    })
    socket.on('den11on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den3onsv', jsonData)
        io.emit('den11onsv', data)
    })
    socket.on('den11off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den3offsv', jsonData)
        io.emit('den11offsv', data)
    })
    socket.on('den12on', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        // io.emit('den3onsv', jsonData)
        io.emit('den12onsv', data)
    })
    socket.on('den12off', (data) => {
        var jsonData = JSON.stringify({ data: data })
        console.log(data)
        //io.emit('den3offsv', jsonData)
        io.emit('den12offsv', data)
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