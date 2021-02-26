const express = require('express')
const cors = require('cors')


class Server{
    constructor (){
        this.app = express();
        this.port = process.env.PORT;
        this.routesPath = '/api/usuarios';


        //Middleware

        this.middleware();

        //Rutas de mi aplicación.
        this.routes();
    }

    middleware(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body 
        this.app.use(express.json());


        //Directorio público.
        this.app.use(express.static('public'));
    }

    routes(){
        //EndPoint
       this.app.use(this.routesPath, require('../routes/usuarios'));
          
         
           
           
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto ', this.port);
        }); 
    }
}



module.exports = Server;