import Presupuesto from '../models/presupuesto.js';
import Proyecto from '../models/proyecto.js';

// Obtener los registros de proyectos para mostrarlos en los select
export const getProyectosPresupuesto = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.status(200).json(proyectos);
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).send("Error al obtener los proyectos");
  }
};