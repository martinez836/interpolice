# backend de la aplicacion

-Descargo los paquetes basicos 
    nodemon:
    express:
    cors:
    mysql:

-comando para descargarlos 
    npm i express nodemon cors mysql2  

-creo el archivo .env para insertar los datos para conectar con la base de datos 
-importo las librerias en el index.js

-Descargo el dotenv para manejar las variables globales para conectar con la base de datos

-instancio las librerias en el index.js
-Asigno el puerto que será 4100

-Creo el archivo dentro de src llamado dbConexion para crear la conexion a la base de datos e importo la librera de mysql2

-Especifico los parametro de la conexion

-pruebo la conexion y la exporto

-No me servia pero la solucion era que me faltaba importar la conexion a la base de datos en el index

-Creo el modulo de ciudadanos

-importo las librerias e instancio el router del ciudadano
    creo el metodo para listarTodos
    Creo el metodo para listar por id
    creo el metodo para insertar el ciudadano
    Creo el metodo para actualizar el ciudadano 
    Creo el metodo para eliminar el ciudadano de manera logica
