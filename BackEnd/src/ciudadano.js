//importo las librerias necesarias
import dbConfig from './dbConexion.js';
import express from 'express';
import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//instancio el metodo router del ciudadano
const ciudadano = express.Router();

//listo los ciudadanos
ciudadano.get("/ciudadano/listarTodos", async (req,res) => {
    try {
        let consulta = "select * from ciudadano;";

        let [resultado] = await dbConfig.query(consulta);

        //la respuesta del servidor 

        res.send({
            estado: "ok",
            data: resultado
        })
    } catch (error) {
        res.status(500).send({
        estado: "Error", 
        data: error.code + "=>" + error.message, // code envia el error detallado desde node js
    })
    }
})

//listar por id 
ciudadano.get("/ciudadano/listarId/:id", async (req,res) => {
    try {
        //tomo el id 
        let id = req.params.id

        let consulta = "select * from ciudadano where codigo = ?;";
        let resultado = await dbConfig.query(consulta, [id]);

        res.send({
            estado: "ok", 
            data: resultado 
        })
    } catch (error) {
        res.status(500).send({
        estado: "Error", 
        data: error.code + "=>" + error.message, // code envia el error detallado desde node js
    })
    }
})

//insertar ciudadano
ciudadano.post("/ciudadano/crear",async (req,res) => {
try {

    const {
      nombre,
      apellidos,
      apodo,
      fechaNacimiento,
      planetaOrigen,
      planetaResidencia,
      foto,
      estado
    } = req.body;

    // Generar el contenido del QR
    const textoQR = `Nombre: ${nombre}\nApellidos: ${apellidos}\nApodo: ${apodo}\nNacimiento: ${fechaNacimiento}\nOrigen: ${planetaOrigen}\nResidencia: ${planetaResidencia}`;

    // Crear un nombre de archivo único para el QR
    const nombreArchivo = `${nombre.toLowerCase().replace(/\s/g, '_')}_${Date.now()}.png`;

    // Ruta física donde guardar la imagen
    const rutaQR = path.join(__dirname, '../public/qrs', nombreArchivo);

    // Ruta que se guardará en la BD (visible desde el navegador)
    const rutaPublica = `/qrs/${nombreArchivo}`;

    // Generar el archivo QR
    await QRCode.toFile(rutaQR, textoQR);


    let datos = {
        nombre :  req.body.nombre,
        apellidos: req.body.apellidos,
        apodo:  req.body.apodo,
        fechaNacimiento:  req.body.fechaNacimiento,
        planetaOrigen: req.body.planetaOrigen,
        planetaResidencia: req.body.planetaResidencia,
        foto: req.body.foto,
        codigoQR: rutaPublica,
        estado: req.body.estado
    };

    let consulta = "insert into ciudadano set ?;";
    let [resultado] = await dbConfig.query(consulta, [datos])

    res.send({
        estado: "ok", 
        data: resultado     
    })
} catch (error) {
    res.status(500).send({
        estado: "No se pudo insertar", 
        data: error.code + "=>" + error.message, // code envia el error detallado desde node js
    })
}
    
})

//actualizar ciudadano
ciudadano.put("/ciudadano/actualizar/:id", async (req,res) => {
    try {
        let id = req.params.id;

        const {
            nombre,
            apellidos,
            apodo,
            fechaNacimiento,
            planetaOrigen,
            planetaResidencia,
            foto,
            estado
        } = req.body;

        // 1. Generar el nuevo contenido del QR
        const textoQR = `Nombre: ${nombre}\nApellidos: ${apellidos}\nApodo: ${apodo}\nNacimiento: ${fechaNacimiento}\nOrigen: ${planetaOrigen}\nResidencia: ${planetaResidencia}`;

        // 2. Nombre único para el archivo QR
        const nombreArchivo = `${nombre.toLowerCase().replace(/\s/g, '_')}_${Date.now()}.png`;

        // 3. Ruta física para guardar
        const rutaQR = path.join(__dirname, '../public/qrs', nombreArchivo);

        // 4. Ruta pública que se guarda en BD
        const rutaPublica = `/qrs/${nombreArchivo}`;

        // 5. Crear el nuevo archivo QR
        await QRCode.toFile(rutaQR, textoQR);

        let datos = {
        nombre :  req.body.nombre,
        apellidos: req.body.apellidos,
        apodo:  req.body.apodo,
        fechaNacimiento:  req.body.fechaNacimiento,
        planetaOrigen: req.body.planetaOrigen,
        planetaResidencia: req.body.planetaResidencia,
        foto: req.body.foto,
        codigoQR: rutaPublica,
        estado: req.body.estado
    }; 
    let consulta = "update ciudadano set ? where codigo = ?;";
    let [resultado] = await dbConfig.query(consulta,[datos,id]);

    res.send({
        estado: "ok", 
        data: resultado         
    })

    } catch (error) {
        res.status(500).send({
        estado: "No se pudo actualizar", 
        data: error.code + "=>" + error.message, // code envia el error detallado desde node js
    })
    }
})

//eliminar ciudadano de manera logica
ciudadano.put("/ciudadano/eliminar/:id", async (req,res) => {
    try {
        let id = req.params.id;
        let datos = {
            estado: 2,
        }

        let consulta = "update ciudadano set ? where codigo = ?;";
        let [resultado] = await dbConfig.query(consulta,[datos,id]);

        res.send({
            estado: "ok", 
        data: resultado   
        })
    } catch (error) {
            res.status(500).send({
            estado: "No se pudo eliminar", 
            data: error.code + "=>" + error.message, // code envia el error detallado desde node js
        })
    }
})


export default ciudadano