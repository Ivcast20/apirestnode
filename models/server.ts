import express, {Application} from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';

import db from '../db/connection';

class Server
{
    private app: Application;
    private port: string;
    private apiPath = {
        usuarios : '/api/usuarios'
    }
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        this.middlewares();

        this.routes();

    }

    middlewares()
    {
        //cors
        this.app.use( cors() );
        //lectura del body
        this.app.use(express.json());
        //carpeta publica
    }

    async dbConnection()
    {
        try {
            await db.authenticate();
            console.log('Database Online');
        } catch (error) {
            console.log(error);
        }
    }


    routes()
    {
        this.app.use(this.apiPath.usuarios, userRoutes);
    }

    listen()
    {
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto '+this.port);
        });
    }
}

export default Server;