import { Router } from "express";

// Importando los controladores
import { actualizarUsuario, crearUsuario, detallesUsuario, eliminarUsuario, getUsuarios } from "../controllers/usuariosController.js";
import { actualizarProyecto, crearProyecto, detallesProyecto, eliminarProyecto, getProyectos } from "../controllers/proyectosController.js";
import { getPartidas } from "../controllers/partidasController.js";
import { getPresupuestos } from "../controllers/contaduriaController.js";

import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Se enruta a las views

// Esta es la primer view que se va a tener al buscar localhost:3000 en el navegador:
router.get('/', (req, res)=> res.render('contaduria.ejs', { title: "Contaduria" }));

// Demas vistas para para el navbar
router.get('/index', (req, res) => res.render('index.ejs', { title: "Pinky Piensa Web" }));

// Llamadas para el controlador de users
router.get('/users', getUsuarios);
router.post('/users', crearUsuario);
router.get('/users/:id', detallesUsuario);
router.put('/users/:id', actualizarUsuario);
router.delete('/users/:id', eliminarUsuario);

// Llamadas para el controlador de proyectos
router.get('/proyectos', getProyectos);
router.post('/proyectos', crearProyecto);
router.get('/proyectos/:idProyecto', detallesProyecto);
router.put('/proyectos/:idProyecto', actualizarProyecto);
router.delete('/proyectos/:idProyecto', eliminarProyecto);

// Llamadas para el controlador de partidas
router.get('/partidas', getPartidas);

// Llamadas para el controlador de contaduria
router.get('/contadurias', getPresupuestos);

export default router;