import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authUser
} from './auth.controller.js';

const router = express.Router();

// rutas para usuarios
router.get('/listarTodos', getUsers);
router.get('/listarId/:id', getUserById);
router.post('/crear', createUser);
router.post('/login', authUser);
router.put('/actualizar/:id', updateUser);
router.delete('/borrar/:id', deleteUser);

export default router;
