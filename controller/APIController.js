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
module.exports = {
    getUser,
    getADCStart,
    getADCActive,
}