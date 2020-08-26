const express = require('express')
const app = express()
const router = require('./routes/routes')

const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', router)

app.listen(3333, () =>{
    console.log('Servidor abriu !')
})