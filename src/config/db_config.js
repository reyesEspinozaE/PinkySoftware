import { Sequelize } from 'sequelize';

const dbConfig = {
    host: 'PinkySoftware01.mssql.somee.com',
    database: 'PinkySoftware01',
    username: 'Everth_Re_SQLLogin_1',
    password: 'Pinkysoftware2024',
    charset: 'utf8mb4',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true, // Si la base de datos requiere encriptación
            enableArithAbort: true
        }
    }
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: false 
});

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        // Realizar una prueba de consulta
        const [results, metadata] = await sequelize.query('SELECT 1+1 AS result');
        console.log('Prueba de consulta realizada con éxito:', results);
    } catch (err) {
        console.error('No se pudo conectar a la base de datos o la prueba de consulta falló:', err.message);
    }
};
testConnection();

export default sequelize;
