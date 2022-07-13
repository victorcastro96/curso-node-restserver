
const {response} = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async(req, res = response) => {

    const {id_token} = req.body;

    try {
        const {nombre, correo, image} = await googleVerify( id_token );

        let user = await User.findOne({correo});

        if(!user){

            const data = {
                nombre,
                correo,
                password: ':P',
                image,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        if(!user.status){
            res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generarJWT( user.id );

        res.json({
            user,
            id_token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSingIn
}