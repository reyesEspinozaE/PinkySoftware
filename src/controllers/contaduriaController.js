import Presupuesto from '../models/presupuesto.js';
import Gasto from '../models/gasto.js';

// Obtener todos los registros de presupuestos y gastos
export const getContaduriaData = async (req, res) => {
  try {
    const [presupuestos, gastos] = await Promise.all([Presupuesto.findAll(), Gasto.findAll()]);
    res.render('contadurias.ejs', {
      title: 'Contaduría',
      presupuestos,
      gastos
    });
  } catch (error) {
    console.error("Error al obtener los datos de contaduría:", error);
    res.status(500).send("Error al obtener los datos de contaduría");
  }
};

// Crear un nuevo presupuesto
export const crearPresupuesto = async (req, res) => {
  try {
    const nuevoPresupuesto = await Presupuesto.create(req.body);
    res.status(201).json(nuevoPresupuesto);
  } catch (error) {
    console.error("Error al crear presupuesto:", error);
    res.status(500).send("Error al crear presupuesto");
  }
};

// Crear un nuevo gasto
export const crearGasto = async (req, res) => {
  try {
    const nuevoGasto = await Gasto.create(req.body);
    res.status(201).json(nuevoGasto);
  } catch (error) {
    console.error("Error al crear gasto:", error);
    res.status(500).send("Error al crear gasto");
  }
};

// Eliminar un presupuesto
export const eliminarPresupuesto = async (req, res) => {
  try {
    const { id } = req.params;
    await Presupuesto.destroy({ where: { idPresupuesto: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar presupuesto:", error);
    res.status(500).send("Error al eliminar presupuesto");
  }
};

// Eliminar un gasto
export const eliminarGasto = async (req, res) => {
  try {
    const { id } = req.params;
    await Gasto.destroy({ where: { idGasto: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar gasto:", error);
    res.status(500).send("Error al eliminar gasto");
  }
};

// Actualizar un presupuesto
export const actualizarPresupuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Presupuesto.update(req.body, { where: { idPresupuesto: id } });
    if (updated) {
      const updatedPresupuesto = await Presupuesto.findOne({ where: { idPresupuesto: id } });
      res.status(200).json(updatedPresupuesto);
    } else {
      res.status(404).send("Presupuesto no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar presupuesto:", error);
    res.status(500).send("Error al actualizar presupuesto");
  }
};

// Actualizar un gasto
export const actualizarGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Gasto.update(req.body, { where: { idGasto: id } });
    if (updated) {
      const updatedGasto = await Gasto.findOne({ where: { idGasto: id } });
      res.status(200).json(updatedGasto);
    } else {
      res.status(404).send("Gasto no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar gasto:", error);
    res.status(500).send("Error al actualizar gasto");
  }
};

// Obtener un presupuesto para editar
export const editarPresupuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const presupuesto = await Presupuesto.findOne({ where: { idPresupuesto: id } });
    if (presupuesto) {
      res.status(200).json(presupuesto);
    } else {
      res.status(404).send("Presupuesto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener presupuesto:", error);
    res.status(500).send("Error al obtener presupuesto");
  }
};

// Obtener un gasto para editar
export const editarGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const gasto = await Gasto.findOne({ where: { idGasto: id } });
    if (gasto) {
      res.status(200).json(gasto);
    } else {
      res.status(404).send("Gasto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener gasto:", error);
    res.status(500).send("Error al obtener gasto");
  }
};
