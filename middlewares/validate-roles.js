const { response } = require("express");

const isAdminRole = (req, res = response, next) => {

    const {role ,nombre} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }
    next();
}

const haveRole = ( ...roles ) => {

    return (req, res = response, next) => {

        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `Requiere uno de estos roles: ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    haveRole
}