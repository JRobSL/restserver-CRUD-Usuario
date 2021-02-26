const {response, request} = require('express');



const usuarioGET =  (req, res = response) => {
    res.json({
        msg:'get API -Controller'
    });

}


const usuarioPOST =  (req, res = response) => {

    const {nombre, edad} = req.body;
    res.json({
        msg:'post API -Controller',
        nombre,
        edad
    });

}
const usuarioPUT =  (req, res = response) => {
    res.json({
        msg:'put API -Controller'
    });

}
const usuarioPATCH =  (req, res = response) => {
    res.json({
        msg:'patch API -Controller'
    });

}
const usuarioDELETE =  (req, res = response) => {
    res.json({
        msg:'delete API -Controller'
    });

}




module.exports ={
    usuarioGET,
    usuarioPOST,
    usuarioPATCH,
    usuarioPUT,
    usuarioDELETE
}