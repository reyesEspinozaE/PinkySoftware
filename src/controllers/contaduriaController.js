import Presupuesto from '../models/presupuesto.js';
import Gasto from '../models/gasto.js';

// Obtener todos los registros de presupuestos
export const getPresupuestos = async (req, res) => {
    try {
      const presupuestos = await Presupuesto.findAll();
      res.render('contadurias.ejs', {
        title: 'Presupuestos',
        presupuestos
      });
    } catch (error) {
      console.error("Error al obtener los presupuestos:", error);
      res.status(500).send("Error al obtener los presupuestos");
    }
  };
  