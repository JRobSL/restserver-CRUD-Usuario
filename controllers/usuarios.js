const {response, request} = require('express');
const Usuario =require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuarioGET =  async(req= request, res = response) => {

    //para obtener el limite de los registros desestructuramos de los argumentos que 
    // se enuentran en el request.query
    const {limite =5, desde =0} = req.query;
    const query = {estado:true};
    // const usuarios = await Usuario.find()
    //      .skip(Number(desde))
    //      .limit(Number(limite));
    // const totalUsuarios = await Usuario.count();


    //Creamos una promesa de coleccion de arreglos (COlección de las dos promesas anteriores) 
// const resp  = await Promise.all([
    //Creamos una desestrucracion de arreglos. ([1°Promesa, 2°Promesa, ....])
    const [totalUsuarios,usuarios]  = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        //resp
        totalUsuarios,
        usuarios
    });

}


const usuarioPOST =  async (req, res = response) => {

    //obtenemos el body del request 
    const {nombre, correo,password, rol} = req.body;
    //creamos el modelo de usuario con el boby 
    const usuario = new Usuario({nombre, correo,password, rol});
    //ENCRIPTAR CONTRASEÑA
    //generamos sicronicamente el salto. 
    const salt = bcryptjs.genSaltSync();
    //le pasamos el salto generaro a la funcion hashSync() para encriptar la contraseña 
    usuario.password = bcryptjs.hashSync(password,salt);
    
    //Guardamos en base de datos el usuario con 
    //la funcion save de 
    await usuario.save();

    res.json({
        usuario
    });

}
const usuarioPUT =  async (req= request, res = response) => {

    const {id} = req.params;
    //separamos los campos _id, password, google y correo por que no se deben actualizar
    const {_id, password, google, correo, ...resto} = req.body;

    //TO DO validar contra base de datos.
    if(password){
        //generamos sicronicamente el salto. 
        const salt = bcryptjs.genSaltSync();
        //le pasamos el salto generaro a la funcion hashSync() para encriptar la contraseña 
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        usuario
    });

}
const usuarioPATCH =  (req, res = response) => {
    res.json({
        msg:'patch API -Controller'
    });

}
const usuarioDELETE = async (req, res = response) => {

    const {id} = req.params;
    const body = req.body;
    //Borrado fisicamente
   // const usuario = await Usuario.findByIdAndDelete(id);
    // Actualizamos el estado a false
    const usuario = await Usuario.findByIdAndUpdate(id,{estado :false})

    res.json({
        msg:'delete API -Controller',
        usuario
    });

}




module.exports ={
    usuarioGET,
    usuarioPOST,
    usuarioPATCH,
    usuarioPUT,
    usuarioDELETE
}