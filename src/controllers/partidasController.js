// controllers/partidasController.js
import Partida from '../models/partida.js';

export const getPartidas = async (req, res) => {
  try {
    const partidas = await Partida.findAll();
    res.json(partidas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las partidas', error });
  }
};