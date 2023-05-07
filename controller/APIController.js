const { connect } = require("../DB")
const { connection } = require('../MySQL')
const userModel = require('../models/user')
let getUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
let getADCStart = async (req, res) => {
    try {
        let [data] = await connection.execute('SELECT value,time FROM adc_1 ORDER BY id DESC LIMIT 6;')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
let getADCActive = async (req, res) => {
    try {
        let [data] = await connection.execute('SELECT value,time FROM adc_1 ORDER BY id DESC LIMIT 1;')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

let getRS485Start = async (req, res) => {
    try {
        let [data] = await connection.execute('SELECT N,P,K,humdity,pH,time FROM rs485_2 ORDER BY id DESC LIMIT 6;')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
let getRS485Active = async (req, res) => {
    try {
        let [data] = await connection.execute('SELECT N,P,K,humdity,pH,time FROM rs485_2 ORDER BY id DESC LIMIT 1;')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
let getButton = async (req, res) => {
    try {
        let [data] = await connection.execute('SELECT bit8,bit7,bit6,bit5,bit4,bit3 FROM button1 ORDER BY id DESC LIMIT 1;')
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports = {
    getUser,
    getADCStart,
    getADCActive,
    getRS485Start,
    getRS485Active,
    getButton,
}