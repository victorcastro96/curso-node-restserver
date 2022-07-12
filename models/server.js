const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        this.conectarDB();
        //middlewares: añadir otras funcionalidades al webserver
        this.middlewares();

        //rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use( express.static('public') )
    }

    routes() {
       this.app.use(this.authPath, require('../routes/auth'));
       this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Servidor corriendo en puerto:', this.port)
        });
    }
}

module.exports = Server;