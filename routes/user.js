const { Router } = require('express') ;
const { check } = require('express-validator');

const { userGet, 
        userPut, 
        userPost, 
        userDelete } = require('../controllers/user');
        
const { isRole, isEmail, isUserById } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-field');
const validateJWT = require('../middlewares/validate-jwt');
const {isAdminRole, haveRole} = require('../middlewares/validate-roles');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
        check('id', 'No es un id válido').isMongoId(), 
        check('id').custom( isUserById ),
        check('role').custom( isRole ),
        validateFields
] ,userPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
        check('correo').custom( isEmail ),
        //check('role', 'No es un rol válido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
        check('role').custom( isRole ),
        validateFields
], userPost);

router.delete('/:id', [
        validateJWT,
        isAdminRole,
        //haveRole('ADMIN_ROLE','SALES_ROLE'),
        check('id', 'No es un id válido').isMongoId(), 
        check('id').custom( isUserById ),
        validateFields
], userDelete);

module.exports = router;