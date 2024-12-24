import Proyecto from '../models/proyecto.js';
import Partida from '../models/partida.js';
import Usuario from '../models/usuario.js';
import ProyectoUsuario from '../models/proyectoUsuario.js';

// Obtener todos los registros de proyectos
export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll({ include: Partida }); // Incluir el modelo Partida en la consulta
    const proyectosUsuario = await ProyectoUsuario.findAll();

    if(proyectosUsuario.idUsuario === ){

    }
    res.render('proyectos.ejs', {
      title: 'Proyectos',
      proyectos
    });
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).send("Error al obtener los proyectos");
  }
};

// Detalles de un proyecto especifico

export const detallesProyecto = async (req, res) => {
  const { idProyecto } = req.params;
  try {
    const proyecto = await Proyecto.findByPk(idProyecto);
    if (proyecto) {
      res.status(200).json(proyecto);
    } else {
      res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener los detalles del proyecto:", error);
    res.status(500).send("Error al obtener los detalles del proyecto");
  }
};

// Verificar si el proyecto ya existe
export const verificarProyectoExistente = async (req, res) => {
  try {
    const { nombreProyecto } = req.query;
    const proyectoExistente = await Proyecto.findOne({ where: { nombreProyecto } });

    if (proyectoExistente) {
      return res.json({ existe: true });
    } else {
      return res.json({ existe: false });
    }
  } catch (error) {
    console.error("Error al verificar el proyecto:", error);
    res.status(500).send("Error al verificar el proyecto");
  }
};

// Crear un nuevo proyecto
export const crearProyecto = async (req, res) => {
  try {
    const { idPartida, nombreProyecto, descripcionProyecto, nombreEncargado, fechaInicio, fechaFin } = req.body;
    console.log('Datos recibidos en el servidor:', { idPartida, nombreProyecto, descripcionProyecto, nombreEncargado, fechaInicio, fechaFin });

    // Verificar que no exista el proyecto
    const proyectoExistente = await Proyecto.findOne({ where: { nombreProyecto } });
    if (proyectoExistente) {
      return res.status(400).json({ mensaje: 'El proyecto ya se encuentra registrado' });
    }

    // Crear el nuevo proyecto
    const nuevoProyecto = await Proyecto.create({
      idPartida,
      nombreProyecto,
      descripcionProyecto,
      nombreEncargado,
      fechaInicio,
      fechaFin
    });

    // Obtener el ID del usuario encargado
    const usuario = await Usuario.findOne({ where: { nombreUsuario: nombreEncargado } });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    // Crear el registro en ProyectoUsuario
    await ProyectoUsuario.create({
      idProyecto: nuevoProyecto.idProyecto,
      idUsuario: usuario.idUsuario,
    });

    res.status(201).json({ mensaje: 'Proyecto creado exitosamente', proyecto: nuevoProyecto });
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).send("Error al crear el proyecto");
  }
};


// Actualizar un proyecto por su ID
export const actualizarProyecto = async (req, res) => {
  const { idProyecto } = req.params;
  const { idPartida, nombreProyecto, descripcionProyecto, nombreEncargado, fechaInicio, fechaFin } = req.body;

  try {
    const proyecto = await Proyecto.findByPk(idProyecto);
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }

    // Guardar el nombre del encargado actual antes de actualizar
    const nombreEncargadoAnterior = proyecto.nombreEncargado;

    // Actualizar los datos del proyecto
    proyecto.idPartida = idPartida;
    proyecto.nombreProyecto = nombreProyecto;
    proyecto.descripcionProyecto = descripcionProyecto;
    proyecto.nombreEncargado = nombreEncargado;
    proyecto.fechaInicio = fechaInicio;
    proyecto.fechaFin = fechaFin;
    await proyecto.save();

    // Verificar si el nombre del encargado ha cambiado
    if (nombreEncargado !== nombreEncargadoAnterior) {
      // Obtener el ID del nuevo usuario encargado
      const nuevoUsuario = await Usuario.findOne({ where: { nombreUsuario: nombreEncargado } });
      if (!nuevoUsuario) {
        return res.status(400).json({ mensaje: 'Nuevo usuario encargado no encontrado' });
      }

      // Actualizar la entrada en ProyectoUsuario con el nuevo idUsuario
      await ProyectoUsuario.update(
        { idUsuario: nuevoUsuario.idUsuario },
        { where: { idProyecto: idProyecto } }
      );
    }

    res.status(200).json({ mensaje: 'Proyecto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    res.status(500).send('Error al actualizar el proyecto');
  }
};

// Eliminar un proyecto
export const eliminarProyecto = async (req, res) => {
  const { idProyecto } = req.params;
  try {
    // Eliminar la relación con los usuarios primero
    const proyectoUsuarioEliminado = await ProyectoUsuario.destroy({
      where: { idProyecto: idProyecto }
    });

    // Verificar si se eliminaron las relaciones con los usuarios
    if (proyectoUsuarioEliminado !== undefined) {
      // Luego, eliminar el proyecto
      const proyectoEliminado = await Proyecto.destroy({
        where: { idProyecto: idProyecto }
      });

      // Verificar si se eliminó el proyecto
      if (proyectoEliminado === 1) {
        res.status(200).json({ mensaje: 'Proyecto eliminado exitosamente' });
      } else {
        res.status(404).json({ mensaje: 'Proyecto no encontrado' });
      }
    } else {
      res.status(500).json({ mensaje: 'Error al eliminar las relaciones de usuario' });
    }
  } catch (error) {
    console.error("Error al eliminar el proyecto: ", error);
    res.status(500).send("Error al eliminar el proyecto");
  }
};
