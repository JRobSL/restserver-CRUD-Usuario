const mongoose = require('mongoose');


//FUNCION PARA LA CONEXION A MONGODB ATLAS
const debConnection = async()=>{

    try {

       await mongoose.connect(process.env.MONGODB_CON,{
           useNewUrlParser:true,
           useUnifiedTopology:true,
           useCreateIndex:true,
           useFindAndModify:false
       });

       console.log('Base de datos ONLINE!!!');

        
    } catch (error) {
        console.log(error);
        throw new Error(`Error a la hora de inicar la base de datos`, error);
        
    }



}



module.exports = debConnection;