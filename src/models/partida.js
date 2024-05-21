// models/Partida.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Partida = sequelize.define('Partida', {
    idPartida: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombrePartida: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    descripcionPartida: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'partidas',
    timestamps: false
});

export default Partida;
