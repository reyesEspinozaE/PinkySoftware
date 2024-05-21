// models/Proyecto.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Proyecto = sequelize.define('Proyecto', {
    idProyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPartida: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombreProyecto: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    descripcionProyecto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    nombreEncargado: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'proyectos',
    timestamps: false
});

export default Proyecto;
