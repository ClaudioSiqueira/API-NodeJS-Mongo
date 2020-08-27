const express = require('express')
const User = require('../models/User')
const router = require('../routes/routes')

class Auth{
    async create(req, res){
        const {email} = req.body

        try{
            if(await User.findOne({email: email})){
                res.status(400)
                return res.send('User already exists')
            }
            const user = await User.create(req.body)
            user.password = undefined
            res.send(user)
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new Auth