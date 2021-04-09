const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {esRoleValido, emailExiste, usuarioExiste} = require('../helpers/db-validators');
const {
        usuarioGET,
        usuarioPOST,
        usuarioPATCH,
        usuarioPUT,
        usuarioDELETE} = require('../controllers/usuarios');

const router = Router();

  // router.get(PATH,MiDDLEWARE, ENDPOINT);

  router.get('/', usuarioGET);
  router.post('/',[
  //check( campoAValidar, mensajeError) => estos errores se guardan en una lista para manejarlos
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mayor de 6 caracteres').isLength({min:6}),
    check('correo').custom(emailExiste).isEmail(),
    // check('correo', 'El correo no es valido').isEmail(),
    //Modificacion personalizada con el custom.
    check( 'rol' ).custom( esRoleValido),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
  ], usuarioPOST);
  router.put('/:id',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(usuarioExiste),
    check( 'rol' ).custom( esRoleValido),
    check('correo').custom(emailExiste).isEmail(),
    validarCampos
  ] ,usuarioPUT);
  router.patch('/', usuarioPATCH);
  router.delete('/:id',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
  ], usuarioDELETE);


module.exports=router;
