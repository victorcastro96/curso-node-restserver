
const {response} = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response ) => {

    const{ correo, password } = req.body;

    try {

        const user = await User.findOne({ correo });

        if(!user){
            return res.status(400).json({
                msg: 'Usuario o correo invalido - correo'
            });
        }

        if(!user.status){
            return res.status(400).json({
                msg: 'Usuario o correo invalido - status'
            })
        }

        const isPassword = bcryptjs.compareSync( password, user.password);
        if(!isPassword){
            return res.status(400).json({
                msg: 'Usuario o correo invalido - password'
            })
        }

        const token = await generarJWT( user.id );
        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
        
    }

}

module.exports = {
    login
}