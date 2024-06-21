import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';

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

// Verificar si el usuario ya existe
export const verificarUsuarioExistente = async (req, res) => {
  try {
    const { correo } = req.query;
    const usuarioExistente = await Usuario.findOne({ where: { correo } });

    if (usuarioExistente) {
      return res.json({ existe: true });
    } else {
      return res.json({ existe: false });
    }
  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    res.status(500).send("Error al verificar el usuario");
  }
};

// Crear un nuevo usuario
// export const crearUsuario = async (req, res) => {
//   try {
//     const { nombreUsuario, correo, contrasenia, rol } = req.body;
//     console.log('Datos recibidos en el servidor:', { nombreUsuario, correo, contrasenia });

//     // Cifrar la contraseña
//     const hashedPassword = await bcrypt.hash(contrasenia, 10);

//     const nuevoUsuario = await Usuario.create({
//       nombreUsuario,
//       correo,
//       contrasenia: hashedPassword,
//       rol: rol
//     });
//     res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
//   } catch (error) {
//     console.error("Error al crear el usuario:", error);
//     res.status(500).send("Error al crear el usuario");
//   }
// };
// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombreUsuario, correo, contrasenia, rol } = req.body;
    console.log('Datos recibidos en el servidor:', { nombreUsuario, correo, contrasenia, rol });

    // Verificar que no exista el usuario
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya se encuentra registrado' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const nuevoUsuario = await Usuario.create({
      nombreUsuario,
      correo,
      contrasenia: hashedPassword,
      rol: rol
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
  const { nombreUsuario, correo, contrasenia, rol } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    console.log("Received data for updt user:", { nombreUsuario, correo, contrasenia, rol });
    if (usuario) {
      usuario.nombreUsuario = nombreUsuario;
      usuario.correo = correo;
      usuario.rol = rol;

      // Verifica si se proporcionó una nueva contraseña y se cifra
      if (contrasenia) {
        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        usuario.contrasenia = hashedPassword;
      }

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