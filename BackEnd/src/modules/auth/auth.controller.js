import {
    getUsersDB,
    getUserByIdDB,
    createUserDB,
    updateUserDB,
    deleteUserDB,
    authUserDB
} from './auth.models.js';

export async function getUsers(req, res) {
    try {
        const users = await getUsersDB();
            res.status(200).send({
            status: "ok",
            data: users,
        });
    } catch (error) {
       res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await getUserByIdDB(id);
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "usuario no encontrado.",
      });
    }
    res.status(200).send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function createUser(req, res) {
  try {
    let data = req.body;
    // Aquí debes añadir validaciones de entrada de datos --- passport-u otra libreria  !!!!!

    const result = await createUserDB(data);
    res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateUserDB(id, data);
    if (result.affectedRows === 0) {
      return res.status(404).send({
        status: "error",
        message: "usuario no encontrado o no hubo cambios para actualizar.",
      });
    }
    res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const result = await deleteUserDB(id);
    if (result.affectedRows === 0) {
      return res.status(404).send({
        status: "error",
        message: "usuario no encontrado para eliminar.",
      });
    }
    res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function authUser(req, res) {
  try {
    let data = req.body;
    // Aquí debes añadir validaciones de entrada de datos --- passport-u otra libreria  !!!!!

    const result = await authUserDB(data);
    console.log(result);
    res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}
