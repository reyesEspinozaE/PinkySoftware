// controllers/proyectoUsuarioController.js
import Usuario from '../models/usuario.js';

// Obtener los registros de users para mostrarlos en el select
export const getProyectoUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las usuarios', error });
    }
};