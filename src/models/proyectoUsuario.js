// models/ProyectoUsuario.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Proyecto from './proyecto.js';
import Usuario from './usuario.js';

const ProyectoUsuario = sequelize.define('ProyectoUsuario', {
    idProyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Proyecto,
            key: 'idProyecto'
        }
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    }
}, {
    tableName: 'proyectoUsuario',
    timestamps: false
});

export default ProyectoUsuario;
