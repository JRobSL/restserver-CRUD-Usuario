const {validationResult} = require('express-validator');

const validarCampos = (req, res, next)=>{
        //manejamos la lista de errores que genero express-validator
        const errores = validationResult(req);

        if( !errores.isEmpty() ){
            return res.status(400).json(errores);
        }
    
        next();

}



module.exports = {
    validarCampos
}