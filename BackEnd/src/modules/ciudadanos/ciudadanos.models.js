import dbconn from '../../config/dbConexion.js';
import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getCiudadanosDB() {
    const [rows] = await dbconn.query('SELECT * FROM ciudadano');
    return rows;
}

export async function getCiudadanoByIdDB(id) {
    const [rows] = await dbconn.query('SELECT * FROM ciudadano WHERE codigo = ?', [id]);
    return rows[0];
}

export async function createCiudadanoDB(data) {
    // Generar el contenido del QR
    const textoQR = `Nombre: ${data.nombre}\nApellidos: ${data.apellidos}\nApodo: ${data.apodo}\nNacimiento: ${data.fechaNacimiento}\nOrigen: ${data.planetaOrigen}\nResidencia: ${data.planetaResidencia}`;

    // Crear un nombre de archivo único para el QR
    const nombreArchivo = `${data.nombre.toLowerCase().replace(/\s/g, '_')}_${Date.now()}.png`;

    // Ruta física donde guardar la imagen
    const rutaQR = path.join(__dirname, '../../../public/qrs', nombreArchivo);

    // Ruta que se guardará en la BD (visible desde el navegador)
    const rutaPublica = `/qrs/${nombreArchivo}`;

    // Generar el archivo QR
    await QRCode.toFile(rutaQR, textoQR);

    const ciudadanoNuevo = {
        nombre: data.nombre,
        apellidos: data.apellidos,
        apodo: data.apodo,
        fechaNacimiento: data.fechaNacimiento,
        planetaOrigen: data.planetaOrigen,
        planetaResidencia: data.planetaResidencia,
        foto: data.foto,
        codigoQR: rutaPublica,
        estado: data.estado
    };

    const [result] = await dbconn.query('INSERT INTO ciudadano SET ?', [ciudadanoNuevo]);
    return result;
}

export async function updateCiudadanoDB(id, data) {
    // Generar el contenido del QR
    const textoQR = `Nombre: ${data.nombre}\nApellidos: ${data.apellidos}\nApodo: ${data.apodo}\nNacimiento: ${data.fechaNacimiento}\nOrigen: ${data.planetaOrigen}\nResidencia: ${data.planetaResidencia}`;
    const nombreArchivo = `${data.nombre.toLowerCase().replace(/\s/g, '_')}_${Date.now()}.png`;
    const rutaQR = path.join(__dirname, '../../../public/qrs', nombreArchivo);
    const rutaPublica = `/qrs/${nombreArchivo}`;
    await QRCode.toFile(rutaQR, textoQR);

    const datosActualizados = {
        ...data,
        codigoQR: rutaPublica
    };

    const [result] = await dbconn.query('UPDATE ciudadano SET ? WHERE codigo = ?', [datosActualizados, id]);
    return result;
}

export async function deleteCiudadanoDB(id) {
    // Eliminación lógica: cambia el estado a 2
    const [result] = await dbconn.query('UPDATE ciudadano SET estado = 2 WHERE codigo = ?', [id]);
    return result;
}