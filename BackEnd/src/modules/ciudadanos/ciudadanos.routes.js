import express from 'express';
import {
    getCiudadanos,
    getCiudadanoById,
    createCiudadano,
    updateCiudadano,
    deleteCiudadano
} from './ciudadanos.controller.js';

const router = express.Router();

router.get('/listarTodos', getCiudadanos);
router.get('/listarId/:id', getCiudadanoById);
router.post('/crear', createCiudadano);
router.put('/actualizar/:id', updateCiudadano);
router.put('/eliminar/:id', deleteCiudadano);

export default router;