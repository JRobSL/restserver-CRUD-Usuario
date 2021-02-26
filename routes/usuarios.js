const {Router} = require('express');
const {
        usuarioGET,
        usuarioPOST,
        usuarioPATCH,
        usuarioPUT,
        usuarioDELETE} = require('../controllers/usuarios');

const router = Router();


  router.get('/', usuarioGET);
  router.post('/', usuarioPOST);
  router.put('/', usuarioPUT);
  router.patch('/', usuarioPATCH);
  router.delete('/', usuarioDELETE);


module.exports=router;
