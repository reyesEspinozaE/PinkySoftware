// models/Presupuesto.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Proyecto from './proyecto.js';

const Presupuesto = sequelize.define('Presupuesto', {
    idPresupuesto: {
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
    montoTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    saldoPendiente: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    area: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    fechaMonto: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'presupuestos',
    timestamps: false
});

export default Presupuesto;
