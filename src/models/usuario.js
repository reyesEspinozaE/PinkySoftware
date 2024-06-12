// models/Usuario.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreUsuario: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    contrasenia: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

export default Usuario;
