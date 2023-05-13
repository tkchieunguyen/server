const userModel = require('../models/user')
const bcrypt = require('bcrypt')
global.nameacc = null
global.email = null
global.dateStart = null
global.avatar = null

// ------------- SECURITY ------------------------//
let checkLogin = (req, res, next) => {
    if (req.session.accountId) {
        next()
    }
    else {
        res.redirect('/login')
    }
}

let getHomePage = (req, res) => {
    res.render('home-web')
}
let postLogin = (req, res) => {
    var { username, password } = req.body
    userModel.findOne(
        { username: username },
        (err, account) => {
            if (account) {
                bcrypt.compare(password, account.password, (error, same) => {
                    if (same) {
                        req.session.accountId = account._id
                        req.session.accountName = account.name
                        req.session.accountEmail = account.email
                        req.session.accountDateStart = account.dateStart
                        req.session.username = account.username
                        req.session.avatar = account.image
                        res.redirect('/dashboard')
                    }
                    else {
                        res.redirect('/login')
                    }
                })
            }
            else {
                res.redirect('/login')
            }
        }
    )
}
let getLogin = (req, res) => {
    res.render('login')
}
let postRegister = (req, res) => {
    req.body.image = '/' + req.file.path.split('\\').slice(1).join("/")
    // console.log(req.body)
    userModel.create(req.body, (error, admin) => {
        if (error) {
            console.log(error)
            return res.redirect('/register')
        }
        res.redirect('/login')
    })
}
let getDashboard = (req, res) => {
    res.render('dashboard')
}
let getConfig = (req, res) => {
    res.render('config')
}

let getContact= (req,res)=>{
    res.render('contact')
}
module.exports = {
    getHomePage,
    checkLogin,
    getLogin,
    getDashboard,
    postLogin,
    postRegister,
    getConfig,
    getContact,
    
}