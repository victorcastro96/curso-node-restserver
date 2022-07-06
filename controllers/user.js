const { response, request } = require('express');

const userGet = (req, res = response) => {

  const { q, nombre = "No name", apikey, page = 1, limit} = req.query;

    res.json({
        msg: 'get API',
        q,
        nombre,
        page,
        limit
    });
  }
const userPut = (req = request , res = response) => {

  const id = req.params.id;

    res.json({
        msg: 'put API',
        id
    });
  }
const userPost = (req, res = response) => {

  const { nombre, edad } = req.body;

    res.json({
        msg: 'Post API',
        nombre,
        edad
    });

  }
const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    });
  }

  module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
  }