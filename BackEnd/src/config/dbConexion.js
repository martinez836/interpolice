//importo la libreria de mysql2
import mysql from 'mysql2/promise';

//especifico los parametros de conexion a la base de datos
const dbConfig = await mysql.createConnection(
    {
        host: process.env.HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        database: process.env.DB_DATABASE || 'interpolice',
        password: process.env.DB_PASSWORD || '',
    }
);

//pruebo la conexion a la base de datos
try {
    dbConfig.connect();
    console.log('Conexión a la base de datos exitosa');
} catch (error) {
     console.log(`ocurrió un error en la conexion a la base de datos ${err}`);
}

export default dbConfig;