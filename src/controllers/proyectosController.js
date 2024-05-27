import Proyecto from '../models/proyecto.js';

// Obtener todos los registros

export const getProyectos = async (req, res) => {
    try {
      const proyectos = await Proyecto.findAll();
      res.render('proyectos.ejs', {
        title: "Proyectos",
        proyectos
      });
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      res.status(500).send("Error al obtener los proyectos");
    }
  };
  