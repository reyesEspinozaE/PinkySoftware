// controllers/partidasController.js
import Partida from '../models/partida.js';

// Obtener todas las partidas
export const getPartidas = async (req, res) => {
  try {
    const partidas = await Partida.findAll();
    res.json(partidas);
  } catch (error) {
    console.error("Error al obtener las partidas:", error);
    res.status(500).json({ message: 'Error al obtener las partidas' });
  }
};

// Obtener todas las partidas y renderizar una vista
export const renderPartidasView = async (req, res) => {
  try {
    const partidas = await Partida.findAll();
    res.render('partidas.ejs', {
      title: "Partidas",
      partidas
    });
  } catch (error) {
    console.error("Error al obtener las partidas:", error);
    res.status(500).send("Error al obtener las partidas");
  }
};


// Obtener detalles de una partida específica
export const detallesPartida = async (req, res) => {
  const { idPartida } = req.params;
  try {
    const partida = await Partida.findByPk(idPartida);
    if (partida) {
      res.status(200).json(partida);
    } else {
      res.status(404).json({ mensaje: 'Partida no encontrada' });
    }
  } catch (error) {
    console.error("Error al obtener los detalles de la partida:", error);
    res.status(500).json({ message: 'Error al obtener los detalles de la partida' });
  }
};

// Crear una nueva partida
export const crearPartida = async (req, res) => {
  try {
    const { nombrePartida, descripcionPartida } = req.body;
    console.log('Datos recibidos en el servidor:', { nombrePartida, descripcionPartida });

    const nuevaPartida = await Partida.create({
      nombrePartida,
      descripcionPartida
    });
    res.status(201).json({ mensaje: 'Partida creada exitosamente', partida: nuevaPartida });
  } catch (error) {
    console.error("Error al crear la partida:", error);
    res.status(500).json({ message: 'Error al crear la partida' });
  }
};

// Actualizar una partida por su ID
export const actualizarPartida = async (req, res) => {
  const { idPartida } = req.params;
  const { nombrePartida, descripcionPartida } = req.body;

  try {
    const partida = await Partida.findByPk(idPartida);
    if (partida) {
      partida.nombrePartida = nombrePartida;
      partida.descripcionPartida = descripcionPartida;
      await partida.save();
      res.status(200).json({ mensaje: 'Partida actualizada exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Partida no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la partida:', error);
    res.status(500).json({ message: 'Error al actualizar la partida' });
  }
};

// Eliminar una partida por su ID
export const eliminarPartida = async (req, res) => {
  const { idPartida } = req.params;
  try {
    const partidaEliminada = await Partida.destroy({
      where: { idPartida: idPartida }
    });
    if (partidaEliminada) {
      res.status(200).json({ mensaje: 'Partida eliminada exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Partida no encontrada' });
    }
  } catch (error) {
    console.error("Error al eliminar la partida:", error);
    res.status(500).json({ message: 'Error al eliminar la partida' });
  }
};
