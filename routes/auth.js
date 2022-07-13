const { Router } = require('express') ;
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-field');

const router = Router();

router.post('/login', [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields 
] , login);

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateFields 
] , googleSingIn);

module.exports = router;