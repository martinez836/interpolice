import dbconn from '../../config/dbConexion.js';
import bcrypt from 'bcryptjs';

export async function getUsersDB() {
    const [rows] = await dbconn.query("SELECT * FROM usuarios");
    return rows;
}

export async function getUserByIdDB(id) {
    const [rows] = await dbconn.query("SELECT * FROM usuarios WHERE id_usuarios = ?", [id]);
    return rows[0];
}

export async function createUserDB(userData) {
    let email = userData.email;
    let password = userData.password;

    const [emailExiste] = await dbconn.query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (emailExiste.length > 0) {
        throw new Error("El email ya está registrado");
    }

    const userNuevo = {
        nombre: userData.nombre,
        email: email,
        password: bcrypt.hashSync(password, 11), // Encriptar la contraseña
        rol: userData.rol
    };

    const [result] = await dbconn.query("INSERT INTO usuarios SET ?", [userNuevo]);
    return result;
}

export async function updateUserDB(id, userData) {
    const [result] = await dbconn.query("UPDATE usuarios SET ? WHERE id_usuarios = ?", [userData, id]);
    return result;
}

export async function deleteUserDB(id) {
    const [result] = await dbconn.query("DELETE FROM usuarios WHERE id_usuarios = ?", [id]);
    return result;
}

export async function authUserDB(userData)
{
    let email = userData.email;
    let password = userData.password;

    const [consulta] = await dbconn.query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if( consulta.length > 0) {
        const siCoincide = bcrypt.compareSync(password, consulta[0].password);
        if(siCoincide){
            return consulta;
        }else {
            throw new Error("La contraseña es incorrecta");
        }
    }
    else{
        throw new Error("El usuario no existe");    
    }
}