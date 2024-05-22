// controllers/usuariosController.js

import Usuario from '../models/usuario.js';

// Controlador para manejar las solicitudes relacionadas con los usuarios
const usuariosController = {
    // Método para mostrar todos los usuarios
    async index(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.render('usuarios/index', { usuarios });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    // Método para mostrar el formulario de creación de usuarios
    createForm(req, res) {
        res.render('usuarios/create');
    },

    // Método para crear un nuevo usuario
    async create(req, res) {
        try {
            const { nombreUsuario, correo, contrasenia } = req.body;
            await Usuario.create({ nombreUsuario, correo, contrasenia });
            res.redirect('/users');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    // Otros métodos para actualizar y eliminar usuarios
};

export default usuariosController;


// // controllers/usuariosController.js
// import Usuario from '../models/Usuario.js';

// // Crear un nuevo usuario
// export const crearUsuario = async (req, res) => {
//     const { nombreUsuario, correo, contrasenia } = req.body;
//     try {
//         const nuevoUsuario = await Usuario.create({ nombreUsuario, correo, contrasenia });
//         res.status(201).json(nuevoUsuario);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Obtener todos los usuarios y renderizar la vista users.ejs
// export const mostrarUsuarios = async (req, res) => {
//     try {
//         const usuarios = await Usuario.findAll();
//         res.render('users.ejs', { title: "Usuarios", usuarios: usuarios });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Obtener un usuario por ID
// export const obtenerUsuarioPorId = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const usuario = await Usuario.findByPk(id);
//         if (usuario) {
//             res.status(200).json(usuario);
//         } else {
//             res.status(404).json({ error: 'Usuario no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Actualizar un usuario
// export const actualizarUsuario = async (req, res) => {
//     const { id } = req.params;
//     const { nombreUsuario, correo, contrasenia } = req.body;
//     try {
//         const usuario = await Usuario.findByPk(id);
//         if (usuario) {
//             usuario.nombreUsuario = nombreUsuario;
//             usuario.correo = correo;
//             usuario.contrasenia = contrasenia;
//             await usuario.save();
//             res.status(200).json(usuario);
//         } else {
//             res.status(404).json({ error: 'Usuario no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Eliminar un usuario
// export const eliminarUsuario = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const usuario = await Usuario.findByPk(id);
//         if (usuario) {
//             await usuario.destroy();
//             res.status(204).json();
//         } else {
//             res.status(404).json({ error: 'Usuario no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export default usuariosController;