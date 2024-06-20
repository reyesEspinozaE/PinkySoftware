// models/associations.js
import Proyecto from './proyecto.js';
import Partida from './partida.js';
import Gasto from './gasto.js';
import Presupuesto from './presupuesto.js';
import Usuario from './usuario.js';
import ProyectoUsuario from './proyectoUsuario.js';

// Relación entre Proyecto y Partida
Proyecto.belongsTo(Partida, { foreignKey: 'idPartida' });
Partida.hasMany(Proyecto, { foreignKey: 'idPartida' });

// Relación entre Gasto y Proyecto
Gasto.belongsTo(Proyecto, { foreignKey: 'idProyecto' });
Proyecto.hasMany(Gasto, { foreignKey: 'idProyecto' });

// Relación entre Presupuesto y Proyecto
Presupuesto.belongsTo(Proyecto, { foreignKey: 'idProyecto' });
Proyecto.hasMany(Presupuesto, { foreignKey: 'idProyecto' });

// Relación entre Proyecto y Usuario (Many-to-Many)
Proyecto.belongsToMany(Usuario, { through: ProyectoUsuario, foreignKey: 'idProyecto' });
Usuario.belongsToMany(Proyecto, { through: ProyectoUsuario, foreignKey: 'idUsuario' });
