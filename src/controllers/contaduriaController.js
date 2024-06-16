// import Presupuesto from '../models/presupuesto.js';
// import Gasto from '../models/gasto.js';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '../../uploads'));
//   },
//   filename: function (req, file, cb) {
//       cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// // Obtener todos los registros de presupuestos y gastos
// export const getContaduriaData = async (req, res) => {
//   try {
//     const [presupuestos, gastos] = await Promise.all([Presupuesto.findAll(), Gasto.findAll()]);
//     res.render('contadurias.ejs', {
//       title: 'Contaduría',
//       presupuestos,
//       gastos,
//     });
//   } catch (error) {
//     console.error("Error al obtener los datos de contaduría:", error);
//     res.status(500).send("Error al obtener los datos de contaduría");
//   }
// };

// // Crear un nuevo presupuesto
// export const crearPresupuesto = async (req, res) => {
//   try {
//     const { idProyecto, montoTotal, saldoPendiente, area, fechaMonto, descripcion } = req.body;
//     console.log('Datos recibidos en el servidor:', { idProyecto, montoTotal, saldoPendiente, area, fechaMonto, descripcion });

//     const nuevoPresupuesto = await Presupuesto.create({
//       idProyecto,
//       montoTotal,
//       saldoPendiente,
//       area,
//       fechaMonto,
//       descripcion
//     });
//     res.status(201).json({ mensaje: 'Presupuesto creado exitosamente', presupuesto: nuevoPresupuesto });
//   } catch (error) {
//     console.error("Error al crear presupuesto:", error);
//     res.status(500).send("Error al crear presupuesto");
//   }
// };

// // Crear un nuevo gasto
// // export const crearGasto = async (req, res) => {
// //   upload.single('imagen')(req, res, async (err) => {
// //     if (err instanceof multer.MulterError) {
// //       return res.status(500).json({ error: err.message });
// //     } else if (err) {
// //       return res.status(500).json({ error: err.message });
// //     }

// //     const { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto } = req.body;
// //     const imagen = req.file ? `/uploads/${req.file.filename}` : null; // Ruta relativa de la imagen subida

// //     console.log('Datos recibidos en el servidor:', { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto, imagen });

// //     try {
// //       const nuevoGasto = await Gasto.create({
// //         idProyecto,
// //         descripcionGasto,
// //         lugar,
// //         montoGasto,
// //         fechaGasto,
// //         imagen
// //       });
// //       res.status(201).json({ mensaje: 'Gasto creado exitosamente', gasto: nuevoGasto });
// //     } catch (error) {
// //       console.error("Error al crear gasto:", error);
// //       res.status(500).send("Error al crear gasto");
// //     }
// //   });
// // };


// // Controlador para crear un gasto con imagen
// export const crearGasto = async (req, res) => {
//   upload.single('imagenGasto')(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ error: err.message });
//     } else if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     const { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto } = req.body;
//     const imagen = req.file ? `/uploads/${req.file.filename}` : null;

//     console.log('Datos recibidos en el servidor:', { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto, imagen });

//     try {
//       const nuevoGasto = await Gasto.create({
//         idProyecto,
//         descripcionGasto,
//         lugar,
//         montoGasto,
//         fechaGasto,
//         imagen
//       });
//       res.status(201).json({ mensaje: 'Gasto creado exitosamente', gasto: nuevoGasto });
//     } catch (error) {
//       console.error("Error al crear gasto:", error);
//       res.status(500).send("Error al crear gasto");
//     }
//   });
// };

// // Eliminar un presupuesto
// export const eliminarPresupuesto = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const presupuestoEliminado = await Presupuesto.destroy({
//       where: { idPresupuesto: id }
//     });
//     if (presupuestoEliminado) {
//       res.status(200).json({ mensaje: 'Presupuesto eliminado exitosamente' });
//     } else {
//       res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
//     }
//   } catch (error) {
//     console.error("Error al eliminar el presupuesto:", error);
//     res.status(500).send("Error al eliminar presupuesto");
//   }
// };

// // Eliminar un gasto
// export const eliminarGasto = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const gastoEliminado = await Gasto.destroy({
//       where: { idGasto: id }
//     });
//     if (gastoEliminado) {
//       res.status(200).json({ mensaje: 'Gasto eliminado exitosamente' });
//     } else {
//       res.status(404).json({ mensaje: 'Gasto no encontrado' });
//     }
//   } catch (error) {
//     console.error("Error al eliminar el gasto:", error);
//     res.status(500).send("Error al eliminar gasto");
//   }
// };

// // Actualizar un presupuesto
// export const actualizarPresupuesto = async (req, res) => {
//   const { id } = req.params;
//   const { idProyecto, montoTotal, saldoPendiente, area, fechaMonto, descripcion } = req.body;

//   try {
//     const presupuesto = await Presupuesto.findByPk(id);
//     if (presupuesto) {
//       presupuesto.idProyecto = idProyecto;
//       presupuesto.montoTotal = montoTotal;
//       presupuesto.saldoPendiente = saldoPendiente;
//       presupuesto.area = area;
//       presupuesto.fechaMonto = fechaMonto;
//       presupuesto.descripcion = descripcion;
//       await presupuesto.save();
//       res.status(200).json({ mensaje: 'Presupuesto actualizado exitosamente' });
//     } else {
//       res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
//     }
//   } catch (error) {
//     console.error('Error al actualizar el presupuesto:', error);
//     res.status(500).send('Error al actualizar el presupuesto');
//   }
// };

// // Actualizar un gasto
// export const actualizarGasto = async (req, res) => {
//   const { id } = req.params;
//   const { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto, imagen } = req.body;

//   try {
//     const gasto = await Gasto.findByPk(id);
//     if (gasto) {
//       gasto.idProyecto = idProyecto;
//       gasto.descripcionGasto = descripcionGasto;
//       gasto.lugar = lugar;
//       gasto.montoGasto = montoGasto;
//       gasto.fechaGasto = fechaGasto;
//       gasto.imagen = imagen;
//       await gasto.save();
//       res.status(200).json({ mensaje: 'Gasto actualizado exitosamente' });
//     } else {
//       res.status(404).json({ mensaje: 'Gasto no encontrado' });
//     }
//   } catch (error) {
//     console.error('Error al actualizar el gasto:', error);
//     res.status(500).send('Error al actualizar el gasto');
//   }
// };

// // Detalles de un gasto especifico
// export const detallesGasto = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const gasto = await Gasto.findByPk(id);
//     if (gasto) {
//       res.status(200).json(gasto);
//     } else {
//       res.status(404).json({ mensaje: 'Gasto no encontrado' });
//     }
//   } catch (error) {
//     console.error("Error al obtener los detalles del gasto:", error);
//     res.status(500).send("Error al obtener los detalles del gasto");
//   }
// };

// export const detallesPresupuesto = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const presupuesto = await Presupuesto.findByPk(id);
//     if (presupuesto) {
//       res.status(200).json(presupuesto);
//     } else {
//       res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
//     }
//   } catch (error) {
//     console.error("Error al obtener los detalles del presupuesto:", error);
//     res.status(500).send("Error al obtener los detalles del presupuesto");
//   }
// };


import Presupuesto from '../models/presupuesto.js';
import Gasto from '../models/gasto.js';
import multer from 'multer';
import path from 'path';
import upload from '../config/multerConfig.js';

export const crearGasto = async (req, res) => {
  try {
    upload.single('imagenGasto')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Error de Multer:', err.message);
        return res.status(500).json({ error: err.message });
      } else if (err) {
        console.error('Error al subir el archivo:', err.message);
        return res.status(500).json({ error: err.message });
      }

      const { idProyecto, descripcionGasto, lugarGasto, montoGasto, fechaGasto } = req.body;
      const imagen = req.file ? `/uploads/${req.file.filename}` : null; // Ruta donde se guardó la imagen

      console.log('Datos recibidos en el servidor:', { idProyecto, descripcionGasto, lugarGasto, montoGasto, fechaGasto, imagen });

      // Crear el gasto en la base de datos
      const nuevoGasto = await Gasto.create({
        idProyecto,
        descripcionGasto,
        lugar: lugarGasto,  // Asegúrate de que los nombres de las propiedades coincidan
        montoGasto,
        fechaGasto,
        imagen
      });

      res.status(201).json({ mensaje: 'Gasto creado exitosamente', gasto: nuevoGasto });
    });
  } catch (error) {
    console.error("Error al crear gasto:", error);
    res.status(500).send("Error al crear gasto");
  }
};

// // Crear un gasto con imagen
// export const crearGasto = async (req, res) => {
//   try {
//     upload.single('imagenGasto')(req, res, async (err) => {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ error: err.message });
//       } else if (err) {
//         return res.status(500).json({ error: err.message });
//       }

//       const { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto } = req.body;
//       const imagen = req.file ? `/uploads/${req.file.filename}` : null; // Ruta donde se guardó la imagen

//       console.log('Datos recibidos en el servidor:', { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto, imagen });

//       // Crear el gasto en la base de datos
//       const nuevoGasto = await Gasto.create({
//         idProyecto,
//         descripcionGasto,
//         lugar,
//         montoGasto,
//         fechaGasto,
//         imagen
//       });

//       res.status(201).json({ mensaje: 'Gasto creado exitosamente', gasto: nuevoGasto });
//     });
//   } catch (error) {
//     console.error("Error al crear gasto:", error);
//     res.status(500).send("Error al crear gasto");
//   }
// };

// Obtener todos los registros de presupuestos y gastos
export const getContaduriaData = async (req, res) => {
  try {
    const [presupuestos, gastos] = await Promise.all([Presupuesto.findAll(), Gasto.findAll()]);
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

// Eliminar un gasto
export const eliminarGasto = async (req, res) => {
  const { id } = req.params;
  try {
    const gastoEliminado = await Gasto.destroy({
      where: { idGasto: id }
    });
    if (gastoEliminado) {
      res.status(200).json({ mensaje: 'Gasto eliminado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Gasto no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar el gasto:", error);
    res.status(500).send("Error al eliminar gasto");
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

// Actualizar un gasto
export const actualizarGasto = async (req, res) => {
  const { id } = req.params;
  const { idProyecto, descripcionGasto, lugar, montoGasto, fechaGasto, imagen } = req.body;

  try {
    const gasto = await Gasto.findByPk(id);
    if (gasto) {
      gasto.idProyecto = idProyecto;
      gasto.descripcionGasto = descripcionGasto;
      gasto.lugar = lugar;
      gasto.montoGasto = montoGasto;
      gasto.fechaGasto = fechaGasto;
      gasto.imagen = imagen;
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

// Detalles de un gasto especifico
export const detallesGasto = async (req, res) => {
  const { id } = req.params;
  try {
    const gasto = await Gasto.findByPk(id);
    if (gasto) {
      res.status(200).json(gasto);
    } else {
      res.status(404).json({ mensaje: 'Gasto no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener los detalles del gasto:", error);
    res.status(500).send("Error al obtener los detalles del gasto");
  }
};

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
