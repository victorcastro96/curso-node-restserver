const { response, request } = require('express');
const bcriptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async(req, res = response) => {

  //const { q, nombre = "No name", apikey, page = 1, limit} = req.query;

  const{ limite = 5 } = req.query;
  const query = { status: true };

/*   const users = await User.find(query)
    .limit(Number(limite));

    const total = await User.countDocuments(query); */

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .limit(Number(limite))
    ])

    res.json({
        total,
        users
    });
  }
const userPut = async(req = request , res = response) => {

  const id = req.params.id;

  const { _id, password, google, correo, ...userParams } = req.body;

  if (password) {
     //Encriptar la contraseña
    const salt = bcriptjs.genSaltSync();
    userParams.password = bcriptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate( id, userParams );
    res.json(user);
  }

const userPost = async(req, res = response) => {

  const {nombre, correo, password, role} = req.body;
  const user = new User({nombre, correo, password, role});

  //Encriptar la contraseña
  const salt = bcriptjs.genSaltSync();
  user.password = bcriptjs.hashSync(password, salt);

  //Guardar en db
  await user.save();

    res.json({
        user
    });

  }

const userDelete = async(req, res = response) => {

  const{id} = req.params;

  //Borrado fisico
  //const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        user
    });
  }

  module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
  }