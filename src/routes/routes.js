const express = require('express')
const app = express()
const router = express.Router()
const auth = require('../controllers/AuthController')

router.get('/', (req, res) =>{
    res.send('testando router')
})

router.post('/', auth.create)
router.post('/authenticate', auth.authenticate)

module.exports = router