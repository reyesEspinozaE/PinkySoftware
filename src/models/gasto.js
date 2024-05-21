// models/Gasto.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Proyecto from './proyecto.js';

const Gasto = sequelize.define('Gasto', {
    idGasto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Proyecto,
            key: 'idProyecto'
        }
    },
    descripcionGasto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    lugar: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    montoGasto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fechaGasto: {
        type: DataTypes.DATE,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'gastos',
    timestamps: false
});

export default Gasto;
