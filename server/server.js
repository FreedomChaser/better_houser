require('dotenv').config()
const express = require('express')
const axios = require('axios')
const massive = require('massive')
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')

let {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()

app.use(bodyParser.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})




app.listen(SERVER_PORT, () => {
    console.log(`spellbound on port ${SERVER_PORT}`)
})
