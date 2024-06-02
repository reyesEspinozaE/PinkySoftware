// procedimientosAlmacenados.js
import sequelize from '../config/database.js';

export const verificarPresupuestoPorAcabarse = async () => {
  try {
    const [results, metadata] = await sequelize.query(`
      EXEC verificarPresupuestoPorAcabarse;
    `);
    return results;
  } catch (error) {
    console.error("Error al verificar los presupuestos por acabarse:", error);
    throw new Error("Error al verificar los presupuestos por acabarse");
  }
};
