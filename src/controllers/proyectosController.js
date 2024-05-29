import Proyecto from '../models/proyecto.js';
import Partida from '../models/partida.js';

// Obtener todos los registros de proyectos
export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll({ include: Partida }); // Incluir el modelo Partida en la consulta
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

// Crear un nuevo proyecto

export const crearProyecto = async (req, res) => {
  try {
    const { idPartida, nombreProyecto, descripcionProyecto, nombreEncargado, fechaInicio, fechaFin } = req.body;
    console.log('Datos recibidos en el servidor:', { idPartida, nombreProyecto, descripcionProyecto, nombreEncargado, fechaInicio, fechaFin });

    const nuevoProyecto = await Proyecto.create({
      idPartida,
      nombreProyecto,
      descripcionProyecto,
      nombreEncargado,
      fechaInicio,
      fechaFin
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
    if (proyecto) {
      proyecto.idPartida = idPartida;
      proyecto.nombreProyecto = nombreProyecto;
      proyecto.descripcionProyecto = descripcionProyecto;
      proyecto.nombreEncargado = nombreEncargado;
      proyecto.fechaInicio = fechaInicio;
      proyecto.fechaFin = fechaFin;
      await proyecto.save();
      res.status(200).json({ mensaje: 'Proyecto actualizado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    res.status(500).send('Error al actualizar el proyecto');
  }
};

// Eliminar un proyecto

export const eliminarProyecto = async (req, res) => {
  const { idProyecto } = req.params;
  try {
    const proyectoEliminado = await Proyecto.destroy({
      where: { idProyecto: idProyecto }
    });
    if (proyectoEliminado) {
      res.status(200).json({ mensaje: 'Proyecto eliminado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar el proyecto: ", error);
    res.status(500).send("Error al eliminar el proyecto");
  }
};