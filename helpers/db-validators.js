const Role = require('../models/role');
const User = require('../models/user');

const isRole = async( role = '' ) => {
    const existRole = await Role.findOne({ role });
    if (!existRole){
            throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

const isEmail = async( correo = '' ) => {
    const existEmail = await User.findOne({correo});
    if (existEmail){
        throw new Error(`El correo: ${correo}, ya está registrado`)
    }
}

const isUserById= async( id ) => {
    const existUser = await User.findById(id);
    if (!existUser){
        throw new Error(`El id no existe`)
    }
}



module.exports = {
    isRole,
    isEmail,
    isUserById
}