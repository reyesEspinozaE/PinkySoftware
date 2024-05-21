// sync.js
import sequelize from './config/database.js';
import './models/associations.js'; // Se importan las asociaciones para asegurarse de que se configuren

// Se importan todos los modelos para asegurarse de que estén sincronizados
// import Proyecto from './models/proyecto.js';
// import Gasto from './models/gasto.js';
// import Presupuesto from './models/presupuesto.js';
// import Usuario from './models/usuario.js';
// import Partida from './models/partida.js';
// import ProyectoUsuario from './models/proyectoUsuario.js';

import './models/proyecto.js';
import './models/gasto.js';
import './models/presupuesto.js';
import './models/usuario.js';
import './models/partida.js';
import './models/proyectoUsuario.js';

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Cambiar a 'true' para recrear las tablas
        console.log('La base de datos ha sido sincronizada');
    } catch (error) {
        console.error('Error sincronizando la base de datos:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase();
