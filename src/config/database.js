// config/database.js

import { Sequelize } from 'sequelize';
// Importar los detalles de la conexión desde db_config.js
import dbConfig from './db_config.js';

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        dialectOptions: dbConfig.dialectOptions,
        logging: false // Habilitarlo para ver las consultas SQL en la consola
    }
);

export default sequelize;

