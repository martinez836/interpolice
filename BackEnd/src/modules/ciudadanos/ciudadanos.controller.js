import {
    getCiudadanosDB,
    getCiudadanoByIdDB,
    createCiudadanoDB,
    updateCiudadanoDB,
    deleteCiudadanoDB
} from './ciudadanos.models.js';

export async function getCiudadanos(req, res) {
    try {
        const ciudadanos = await getCiudadanosDB();
        res.status(200).send({
            status: "ok",
            data: ciudadanos
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function getCiudadanoById(req, res) {
    try {
        const id = req.params.id;
        const ciudadano = await getCiudadanoByIdDB(id);
        if (!ciudadano) {
            return res.status(404).send({
                status: "error",
                message: "Ciudadano no encontrado."
            });
        }
        res.status(200).send({
            status: "ok",
            data: ciudadano
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function createCiudadano(req, res) {
    try {
        const data = req.body;
        const result = await createCiudadanoDB(data);
        res.status(200).send({
            status: "ok",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function updateCiudadano(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateCiudadanoDB(id, data);
        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "Ciudadano no encontrado o no hubo cambios para actualizar."
            });
        }
        res.status(200).send({
            status: "ok",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function deleteCiudadano(req, res) {
    try {
        const id = req.params.id;
        const result = await deleteCiudadanoDB(id);
        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "Ciudadano no encontrado para eliminar."
            });
        }
        res.status(200).send({
            status: "ok",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
}