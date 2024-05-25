const dbConfig = {
    host: 'PinkySoftware01.mssql.somee.com',
    database: 'PinkySoftware01',
    username: 'Everth_Re_SQLLogin_1',
    password: 'Pinkysoftware2024',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true, // Si la base de datos requiere encriptación
            enableArithAbort: true
        }
    }
};

export default dbConfig;
