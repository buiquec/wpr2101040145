"use strict";
const express = require('express');
const app = express();
const cookie = require('cookie-parser')
const dotenv = require('dotenv')
const connection = require('./routes/dbsetup');
dotenv.config({ path: './.env'})

app.set('view engine', 'ejs')

app.use('/styles' ,express.static(__dirname + '/public/styles'))

app.use(cookie())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', require('./routes/pages'))


app.listen(parseInt(process.env.CONNECTION_PORT));