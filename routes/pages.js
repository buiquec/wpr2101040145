const express = require('express')
const router = express.Router()
const conn = require('./dbsetup')
const newLogin = require('../controller/login')
const register = require('../controller/register')
const cookie = require('cookie-parser')
const auth = require('../controller/auth')
const inbox = require('../controller/inbox')
const outbox = require('../controller/outbox')
const compose = require('../controller/compose')
const send = require('../controller/send')
const detail = require('../controller/detail')

router.use(cookie())

router.get('/register', (req, res) => {
    res.render('register.ejs', { title: "Sign up" })
})

router.get('/', (req, res) => {
    res.render('login.ejs', { title: "Sign in" })
})

//login
router.post('/', newLogin)
// router.get('/home', (req, res) => {
//     res.render('home.ejs', { username: 'Buiquec', error: false})
// })

//register
router.post('/auth/register', register)

// router.get('/compose', (req, res) => {
//     res.render('compose', { title: "Compose"});
//   });
//logout
router.get('/logout', auth, (req, res) => {
    res.clearCookie('user')
    res.redirect('/')
})

//inbox
router.get('/home/inbox', auth, inbox);

//outbox
router.get('/home/outbox', auth, outbox)

//compose
router.get('/home/compose', auth, compose)
// router.get('/outbox', (req, res) => {
//     res.render('outbox', { title: "Outbox"});
//   });
router.post('/home/compose', auth, send)

//detail
router.get('/home/detail/:id', auth, detail)


module.exports = router