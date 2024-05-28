import Partida from '../models/partida.js';

// Obtener todos los registros de partidas

export const getPartidas = async (req, res) => {
    try {
      const partidas = await Partida.findAll();
      res.render('proyectos.ejs', {
        title: 'Partidas',
        partidas
      });
    } catch (error) {
      console.error("Error al obtener las partidas:", error);
      res.status(500).send("Error al obtener las partidas");
    }
  };
  