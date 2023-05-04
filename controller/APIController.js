const { connect } = require("../DB")
const userModel = require('../models/user')
let getUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = {
    getUser,
}