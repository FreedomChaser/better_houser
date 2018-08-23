require('dotenv').config()
const express = require('express')
const axios = require('axios')
const massive = require('massive')
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcryptjs')

let { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()

app.use(bodyParser.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
        // optional cookie{} like maxAge
    })
)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.post('/api/newUser', async (req, res, next) => {
    const db = req.app.get('db')
    let { username, password } = req.body

    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(password, salt, (err, hash) => {
    //         console.log('the original hash', hash.length);
    //         db.find_user(username).then(foundUser => {
    //             if (foundUser[0]) {
    //                 console.log('if')
    //                 res.sendStatus(422);
    //             } else {
    //                 console.log('else')

    //                 db.create_user(username, hash).then(newUser => {
    //                     console.log(newUser)
    //                     req.session.userid = newUser.userid

    //                     res.sendStatus(200)

    //                 })
    //             }

    //         })
    //     })
    // })


    let salt = await bcrypt.genSalt(10)

    let hashedPassword = await bcrypt.hash(password, salt)

    let foundUser = await db.find_user(username)
    if (foundUser[0]) {
        res.sendStatus(422)
    } else {
        let newUser = await db.create_user(username, hashedPassword)
        req.session.userid = newUser.userid

        let {userid} = req.session
        res.status(200).send({userid})
    }

})

app.post('/api/login', async (req, res) => {
    const db = req.app.get('db')
    let { username, password } = req.body

    // let salt = await bcrypt.genSalt(10)

    let foundUser = await db.find_user(username)

    let answer = await bcrypt.compare(password, foundUser[0].encryptedpassword)
    if (answer) {
        req.session.userid = foundUser[0].userid
        let { userid } = req.session;
        res.status(200).send({ userid })
    } else {
        console.log(res)
        res.sendStatus(403);
    }


    // bcrypt.compare(password, foundUser[0].encryptedpassword, function (err, result) {
    //     console.log('res', result)
    //     if (result) {
    //         req.session.userid = foundUser[0].userid
    //         res.status(200).send(req.session.userid)
    //         console.log(req.session.userid)
    //     } else {
    //         res.sendStatus(403)
    //     }
    // })

    // if(foundUser[0]){
    //     if(bcrypt.hash(password, salt) === foundUser[0].password){
    //         req.session.userid = foundUser[0].userid
    //         res.sendStatus(200)
    //     }else{
    //         res.sendStatus(403)
    //     }
    // }
})

app.post('/api/complete', async (req, res) => {
    const db = req.app.get('db')
    let {
        userid,
        property_name,
        property_description,
        address,
        city,
        usState,
        zip,
        img_url,
        img_alt,
        loan_amount,
        monthly_mortgage,
        desired_rent,
        recommended_rent
    } = req.body

    let newHome = await db.new_home(
        userid,
        property_name,
        property_description,
        loan_amount,
        monthly_mortgage,
        recommended_rent,
        desired_rent,
        address,
        city,
        img_alt,
        img_url,
        usState,
        zip
    )

    res.sendStatus(200)
})

app.get('/api/confirmUser', (req, res) => {
    if (req.session.userid) {
        res.status(200).send(req.session.userid)
    }else {
        res.sendStatus(403)
    }
})

app.post('/api/logout', (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
})



app.listen(SERVER_PORT, () => {
    console.log(`spellbound on port ${SERVER_PORT}`)
})
