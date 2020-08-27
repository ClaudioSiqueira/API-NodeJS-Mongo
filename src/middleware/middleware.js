const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

function middleware(req, res, next){
    const authToken = req.headers['authorization']
    if(authToken != undefined){
        const bearer = authToken.split(' ')
        let token = bearer[1]
        try{
            let decoded = jwt.verify(token, authConfig.secret)
            console.log(decoded)
            req.userId = decoded.id 
            next()
        }catch(err){
            res.status(400).send('erro')
        }
        
    }else{
        return res.status(403).send('Token invalido')
    }
}

module.exports = middleware