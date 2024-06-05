import { Router } from 'express';

// Importando los controladores
import { actualizarUsuario, crearUsuario, detallesUsuario, eliminarUsuario, getUsuarios } from "../controllers/usuariosController.js";
import { actualizarProyecto, crearProyecto, detallesProyecto, eliminarProyecto, getProyectos } from "../controllers/proyectosController.js";
import { getPartidas, renderPartidasView, crearPartida, actualizarPartida, eliminarPartida, detallesPartida } from "../controllers/partidasController.js";
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
    detallesPresupuesto
} from '../controllers/contaduriaController.js';
import { getProyectosGastos } from "../controllers/gastosController.js";
import { getProyectosPresupuesto } from "../controllers/presupuestosController.js";
import { login, forgotPassword, resetPassword } from '../controllers/authController.js';

import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// Metodos para el Login
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


// Se enruta a las views

// Esta es la primer view que se va a tener al buscar localhost:3000 en el navegador:
// View del login
router.get('/', (req, res) => res.render('login', { title: "Pinky Software Login" }));


//router.get('/', (req, res) => res.render('contaduria.ejs', { title: "Contaduria" }));

// Demas vistas para para el navbar
router.get('/index', (req, res) => res.render('index.ejs', { title: "Pinky Piensa Web" }));
router.get('/users', getUsuarios);
router.get('/proyectos', getProyectos);
router.get('/partidas', renderPartidasView);
router.get('/contadurias', getContaduriaData);


// Llamadas para el controlador de users
router.post('/users', crearUsuario);
router.get('/users/:id', detallesUsuario);
router.put('/users/:id', actualizarUsuario);
router.delete('/users/:id', eliminarUsuario);

// Llamadas para el controlador de proyectos
router.post('/proyectos', crearProyecto);
router.get('/proyectos/:idProyecto', detallesProyecto);
router.put('/proyectos/:idProyecto', actualizarProyecto);
router.delete('/proyectos/:idProyecto', eliminarProyecto);

// Llamadas para el controlador de partidas
router.get('/partidasSelect', getPartidas);
router.post('/partidas', crearPartida);
router.put('/partidas/:idPartida', actualizarPartida);
router.get('/partidas/:idPartida', detallesPartida);
router.delete('/partidas/:idPartida', eliminarPartida);

// Llamadas para obtener usuarios para el select en la view de proyectos
router.get('/proyectoUsuario', getProyectoUsuarios);

// Llamadas para el controlador de contaduría

// Rutas para presupuestos
router.post('/presupuestos', crearPresupuesto);
router.delete('/presupuestos/:id', eliminarPresupuesto);
router.put('/presupuestos/:id', actualizarPresupuesto);
router.get('/presupuestos/:id', detallesPresupuesto);

// Rutas para gastos
router.post('/gastos', crearGasto);
router.delete('/gastos/:id', eliminarGasto);
router.put('/gastos/:id', actualizarGasto);
router.get('/gastos/:id', detallesGasto);

// Rutas para obtener los proyectos de presupuestos y gastos
// Presupuestos 
router.get('/presupuestosProyecto', getProyectosPresupuesto);

// Gastos
router.get('/gastosProyecto', getProyectosGastos);

export default router;