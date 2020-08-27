const express = require('express')
const app = express()
const router = express.Router()
const auth = require('../controllers/AuthController')
const project = require('../controllers/ProjectController')
const middleware = require('../middleware/middleware')


router.get('/', (req, res) =>{
    res.send('testando router')
})

router.post('/', auth.create)
router.post('/authenticate', auth.authenticate)
router.get('/teste', middleware,project.teste)

module.exports = router