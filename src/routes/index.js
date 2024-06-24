import { Router } from 'express';
import {
    actualizarUsuario,
    crearUsuario,
    detallesUsuario,
    eliminarUsuario,
    getUsuarios,
    verificarUsuarioExistente
} from "../controllers/usuariosController.js";
import {
    actualizarProyecto,
    crearProyecto,
    detallesProyecto,
    eliminarProyecto,
    getProyectos,
    verificarProyectoExistente
} from "../controllers/proyectosController.js";
import {
    getPartidas,
    renderPartidasView,
    crearPartida,
    actualizarPartida,
    eliminarPartida,
    detallesPartida
} from "../controllers/partidasController.js";
import { getProyectoUsuarios } from "../controllers/proyectoUsuarioController.js";
import {
    getContaduriaData,
    crearPresupuesto,
    crearGasto,
    eliminarPresupuesto,
    eliminarGasto,
    actualizarPresupuesto,
    actualizarGasto,
    detallesGasto,
    detallesPresupuesto,
    obtenerPresupuestoRestante 
} from '../controllers/contaduriaController.js';
import { getProyectosGastos } from "../controllers/gastosController.js";
import { getProyectosPresupuesto } from "../controllers/presupuestosController.js";
import { login, resetPassword } from '../controllers/authController.js';
import bodyParser from 'body-parser';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';
import upload from '../config/multerConfig.js';

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Ruta para crear un nuevo gasto
router.get('/presupuestoRestante/:idProyecto', obtenerPresupuestoRestante);
router.post('/gastos', isAuthenticated, upload.single('imagenGasto'), crearGasto);
// Ruta para actualizar un gasto con imagen
router.put('/gastos/:id', isAuthenticated, upload.single('imagenGasto'), actualizarGasto);

// Metodos para el Login
router.post('/login', login);
router.post('/reset-password', resetPassword);

// Rutas de vistas
router.get('/', (req, res) => res.render('login', { title: "Pinky Software Login" }));
router.get('/index', isAuthenticated, (req, res) => res.render('index', { title: "Pinky Piensa Web" }));

// Rutas protegidas
router.get('/users', isAuthenticated, isAdmin, getUsuarios);
router.get('/proyectos', isAuthenticated, getProyectos);
router.get('/partidas', isAuthenticated, renderPartidasView);
router.get('/contadurias', isAuthenticated, getContaduriaData);

// Rutas para el controlador de usuarios
router.post('/users', isAuthenticated, isAdmin, crearUsuario);
router.get('/users/exists', verificarUsuarioExistente);
router.get('/users/:id', isAuthenticated, isAdmin, detallesUsuario);
router.put('/users/:id', isAuthenticated, isAdmin, actualizarUsuario);
router.delete('/users/:id', isAuthenticated, isAdmin, eliminarUsuario);

// Rutas para el controlador de proyectos
router.post('/proyectos', isAuthenticated, crearProyecto);
router.get('/proyectos/exists', verificarProyectoExistente);
router.get('/proyectos/:idProyecto', isAuthenticated, detallesProyecto);
router.put('/proyectos/:idProyecto', isAuthenticated, actualizarProyecto);
router.delete('/proyectos/:idProyecto', isAuthenticated, eliminarProyecto);

// Rutas para el controlador de partidas
router.get('/partidasSelect', isAuthenticated, getPartidas);
router.post('/partidas', isAuthenticated, crearPartida);
router.put('/partidas/:idPartida', isAuthenticated, actualizarPartida);
router.get('/partidas/:idPartida', isAuthenticated, detallesPartida);
router.delete('/partidas/:idPartida', isAuthenticated, eliminarPartida);

// Rutas para obtener usuarios para el select en la view de proyectos
router.get('/proyectoUsuario', isAuthenticated, getProyectoUsuarios);

// Rutas para el controlador de contaduría
router.post('/presupuestos', isAuthenticated, crearPresupuesto);
router.delete('/presupuestos/:id', isAuthenticated, eliminarPresupuesto);
router.put('/presupuestos/:id', isAuthenticated, actualizarPresupuesto);
router.get('/presupuestos/:id', isAuthenticated, detallesPresupuesto);

// Rutas restantes para el controlador de contaduría
router.delete('/gastos/:id', isAuthenticated, eliminarGasto);
router.get('/gastos/:id', isAuthenticated, detallesGasto);

router.get('/presupuestosProyecto', isAuthenticated, getProyectosPresupuesto);
router.get('/gastosProyecto', isAuthenticated, getProyectosGastos);

export default router;
