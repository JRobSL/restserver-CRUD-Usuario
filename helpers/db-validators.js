const Role = require('../models/role');
const Usuario =require('../models/usuario');

const esRoleValido = async (rol ='') =>{
    const existeRol = await Role.findOne({ rol });
    // console.log(existeRol);

    if(!existeRol){
      throw new Error(`El rol ${rol} no exist en BD`);
    }

  };

  const emailExiste =  async (correo='')=>{  
  const correoExiste = await Usuario.findOne({correo});
    
        if(correoExiste){
            throw new Error(`EL correo ${correo} ya ha sido ingresado a la BD`);
        }

   } 

   const usuarioExiste = async (id)=>{
    const userExiste = await Usuario.findById(id);

    if(!userExiste){
      throw new Error(`EL ID:  ${id} no se encuentra ingresado a la BD`);

    }

   }

  module.exports ={
      esRoleValido,
      emailExiste,
      usuarioExiste

  }