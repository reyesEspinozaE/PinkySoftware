// Detalles de la conexión a la base de datos
// config/db_config.js
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

// Exportar los detalles de la conexión para que estén disponibles para otros archivos
export default dbConfig;
