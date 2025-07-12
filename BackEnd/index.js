//importo las librerias necesarias
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import './src/config/dbConexion.js'; // Importo la conexión a la base de datos
import ciudadano from './src/modules/ciudadanos/ciudadanos.routes.js';
import usuario from './src/modules/auth/auth.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//instancio las librerias
const app = express();
app.use(express.json());
app.use(cors());
app.use('/qrs', express.static(path.join(__dirname, 'public/qrs')));

//importo las rutas
app.use('/ciudadano', ciudadano);
app.use('/usuario',usuario);


//asigno el puerto 
const puerto = process.env.APP_PORT || 4100;


//enciendo el servidor 
app.listen(puerto, () =>{
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})