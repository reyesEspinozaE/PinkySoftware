import Usuario from '../models/usuario.js';

// Obtener todos los registros
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.render('users.ejs', {
      title: "Usuarios",
      usuarios
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).send("Error al obtener los usuarios");
  }
};

// Detalles de un usuario especifico

export const detallesUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener los detalles del usuario:", error);
    res.status(500).send("Error al obtener los detalles del usuario");
  }
};

// Crear un nuevo usuario

export const crearUsuario = async (req, res) => {
  try {
    const { nombreUsuario, correo, contrasenia } = req.body;
    console.log('Datos recibidos en el servidor:', { nombreUsuario, correo, contrasenia });

    const nuevoUsuario = await Usuario.create({
      nombreUsuario,
      correo,
      contrasenia
    });
    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error al crear el usuario");
  }
};

// Eliminar un usuario por su ID

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioEliminado = await Usuario.destroy({
      where: { idUsuario: id }
    });
    if (usuarioEliminado) {
      res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario: ", error);
    res.status(500).send("Error al eliminar el usuario");
  }
};

// Actualizar un usuario por su ID

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombreUsuario, correo, contrasenia } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nombreUsuario = nombreUsuario;
      usuario.correo = correo;
      usuario.contrasenia = contrasenia;
      await usuario.save();
      res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).send('Error al actualizar el usuario');
  }
};
