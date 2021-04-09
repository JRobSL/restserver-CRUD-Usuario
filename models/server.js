const express = require('express')
const cors = require('cors');
const debConnection = require('../database/config');


class Server{
    constructor (){
        this.app = express();
        this.port = process.env.PORT;
        this.routesPath = '/api/usuarios';

        //Conectar a la base de datos
        this.conectarDB();

        //Middleware
        this.middleware();

        //Rutas de mi aplicación.
        this.routes();
    }

    async conectarDB(){
        await debConnection();

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