import Presupuesto from '../models/presupuesto.js';
import Gasto from '../models/gasto.js';
import Proyecto from '../models/proyecto.js';
import fs from 'fs';
import path from 'path';
import { uploadsDir } from '../config/multerConfig.js';

// Obtener el presupuesto restante para un proyecto dado
export const obtenerPresupuestoRestante = async (req, res) => {
  try {
    const { idProyecto } = req.params;

    // Obtener el presupuesto total asignado al proyecto
    const presupuesto = await Presupuesto.findOne({ where: { idProyecto } });

    if (!presupuesto) {
      return res.status(404).json({ mensaje: 'Presupuesto no encontrado para el proyecto.' });
    }

    // Obtener la suma de los gastos del proyecto
    const gastos = await Gasto.sum('montoGasto', { where: { idProyecto } });

    // Calcular el presupuesto restante
    const presupuestoRestante = presupuesto.montoTotal - gastos;

    res.json({ presupuestoRestante });
  } catch (error) {
    console.error('Error al obtener el presupuesto restante:', error);
    res.status(500).send('Error al obtener el presupuesto restante');
  }
};


// Crear un nuevo Gasto
export const crearGasto = async (req, res) => {
  try {
    const { idProyecto, descripcionGasto, lugarGasto, montoGasto, fechaGasto } = req.body;
    const imagen = req.file ? req.file.filename : null; // Guardar solo el nombre del archivo

    console.log('Datos recibidos en el servidor:', { idProyecto, descripcionGasto, lugarGasto, montoGasto, fechaGasto, imagen });

    // Crear el gasto en la base de datos
    const nuevoGasto = await Gasto.create({
      idProyecto,
      descripcionGasto,
      lugar: lugarGasto, // Aquí se mapea lugarGasto a lugar
      montoGasto,
      fechaGasto,
      imagen
    });

    res.status(201).json({ mensaje: 'Gasto creado exitosamente', gasto: nuevoGasto });
  } catch (error) {
    console.error("Error al crear gasto:", error);
    res.status(500).send("Error al crear gasto");
  }
};

//  Actualizar un Gasto
export const actualizarGasto = async (req, res) => {
  const { id } = req.params;
  const { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto } = req.body;
  const imagen = req.file ? req.file.filename : null; // Guardar solo el nombre del archivo
  console.log('Datos recibidos en el servidor:', { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto, imagen });

  try {
    const gasto = await Gasto.findByPk(id);
    if (gasto) {
      if (imagen) {
        // Eliminar la imagen antigua si existe
        if (gasto.imagen) {
          const oldImagePath = path.join(uploadsDir, gasto.imagen);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error(`Error al eliminar la imagen antigua: ${err.message}`);
          });
        }
        gasto.imagen = imagen; // Actualiza la imagen si se ha subido una nueva
      }
      gasto.idProyecto = idProyecto;
      gasto.descripcionGasto = descripcionGasto;
      gasto.lugar = lugar; // Aquí se mapea, solo en caso
      gasto.montoGasto = montoGasto;
      gasto.fechaGasto = fechaGasto;
      await gasto.save();
      res.status(200).json({ mensaje: 'Gasto actualizado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Gasto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el gasto:', error);
    res.status(500).send('Error al actualizar el gasto');
  }
};

// Detalles de un Gasto especifico
export const detallesGasto = async (req, res) => {
  const { id } = req.params;
  try {
    const gasto = await Gasto.findByPk(id);
    if (gasto) {
      // Ajustar la ruta de la imagen para que sea accesible
      if (gasto.imagen) {
        gasto.imagen = `/uploads/${gasto.imagen}`; // Asegurar que la ruta sea correcta
      }
      res.status(200).json(gasto);
      console.log('Los datos solicitados son:', gasto); // Aquí se envían los datos a la consola
    } else {
      res.status(404).json({ mensaje: 'Gasto no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener los detalles del gasto:", error);
    res.status(500).send("Error al obtener los detalles del gasto");
  }
};

// Eliminar un gasto
export const eliminarGasto = async (req, res) => {
  const { id } = req.params;
  try {
    const gasto = await Gasto.findByPk(id);
    if (gasto) {
      // Eliminar la imagen asociada si existe
      if (gasto.imagen) {
        const imagePath = path.join(uploadsDir, gasto.imagen);
        fs.unlink(imagePath, (err) => {
          if (err) console.error(`Error al eliminar la imagen: ${err.message}`);
        });
      }
      await Gasto.destroy({
        where: { idGasto: id }
      });
      res.status(200).json({ mensaje: 'Gasto eliminado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Gasto no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar el gasto:", error);
    res.status(500).send("Error al eliminar gasto");
  }
};

// Obtener todos los registros de presupuestos y gastos
export const getContaduriaData = async (req, res) => {
  try {
    const [presupuestos, gastos] = await Promise.all([
      Presupuesto.findAll({
        include: {
          model: Proyecto,
          attributes: ['nombreProyecto']
        }
      }),
      Gasto.findAll({
        include: {
          model: Proyecto,
          attributes: ['nombreProyecto']
        }
      })
    ]);

    res.render('contadurias.ejs', {
      title: 'Contaduría',
      presupuestos,
      gastos,
    });
  } catch (error) {
    console.error("Error al obtener los datos de contaduría:", error);
    res.status(500).send("Error al obtener los datos de contaduría");
  }
};


// Crear un nuevo presupuesto
export const crearPresupuesto = async (req, res) => {
  try {
    const { idProyecto, montoTotal, saldoPendiente, area, fechaMonto, descripcion } = req.body;
    console.log('Datos recibidos en el servidor:', { idProyecto, montoTotal, saldoPendiente, area, fechaMonto, descripcion });

    const nuevoPresupuesto = await Presupuesto.create({
      idProyecto,
      montoTotal,
      saldoPendiente,
      area,
      fechaMonto,
      descripcion
    });
    res.status(201).json({ mensaje: 'Presupuesto creado exitosamente', presupuesto: nuevoPresupuesto });
  } catch (error) {
    console.error("Error al crear presupuesto:", error);
    res.status(500).send("Error al crear presupuesto");
  }
};

// Eliminar un presupuesto
export const eliminarPresupuesto = async (req, res) => {
  const { id } = req.params;
  try {
    const presupuestoEliminado = await Presupuesto.destroy({
      where: { idPresupuesto: id }
    });
    if (presupuestoEliminado) {
      res.status(200).json({ mensaje: 'Presupuesto eliminado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar el presupuesto:", error);
    res.status(500).send("Error al eliminar presupuesto");
  }
};

// Actualizar un presupuesto
export const actualizarPresupuesto = async (req, res) => {
  const { id } = req.params;
  const { idProyecto, montoTotal, saldoPendiente, area, fechaMonto, descripcion } = req.body;

  try {
    const presupuesto = await Presupuesto.findByPk(id);
    if (presupuesto) {
      presupuesto.idProyecto = idProyecto;
      presupuesto.montoTotal = montoTotal;
      presupuesto.saldoPendiente = saldoPendiente;
      presupuesto.area = area;
      presupuesto.fechaMonto = fechaMonto;
      presupuesto.descripcion = descripcion;
      await presupuesto.save();
      res.status(200).json({ mensaje: 'Presupuesto actualizado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el presupuesto:', error);
    res.status(500).send('Error al actualizar el presupuesto');
  }
};

// Detalles de un presupuesto especifico
export const detallesPresupuesto = async (req, res) => {
  const { id } = req.params;
  try {
    const presupuesto = await Presupuesto.findByPk(id);
    if (presupuesto) {
      res.status(200).json(presupuesto);
    } else {
      res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener los detalles del presupuesto:", error);
    res.status(500).send("Error al obtener los detalles del presupuesto");
  }
};
