const express = require('express')
const User = require('../models/User')
const router = require('../routes/routes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

class Auth{


    teste(){
        return "asdasxcs"
    }

    async create(req, res){
        const {email} = req.body

        try{
            if(await User.findOne({email: email})){
                res.status(400)
                return res.send('User already exists')
            }
            const user = await User.create(req.body)
            user.password = undefined
            const token = jwt.sign({id: user.id}, authConfig.secret, {
                expiresIn:86400
            })
            return res.send({user: user, token: token})
        }catch(err){
            console.log(err)
        }
    }

    async authenticate(req, res){

        const {email, password} = req.body
        const user = await User.findOne({email:email}).select('+password')

        if(user == undefined){
            return res.status(400).send({err: 'Usuário não existe'})
        }
        if(! await bcrypt.compare(password, user.password)){
            return res.status(400).send({err: 'Senha inválida'})
        }
        user.password = undefined

        // Criando Token
        // Recebe 3 parametros: 1:Algo que difere um user de outro(no caso o id), 2: o secret e 3: quanto tempo o token vai durar(no caso 1 dia)
        const token = jwt.sign({id: user.id}, authConfig.secret, {
            expiresIn:86400
        })
        res.send({user, token: token})
    }
}

module.exports = new Auth