import { Router } from "express";
// Importando el controlador de users
import { actualizarUsuario, crearUsuario, detallesUsuario, eliminarUsuario, getUsuarios } from "../controllers/usuariosController.js";
import { actualizarProyecto, crearProyecto, detallesProyecto, eliminarProyecto, getProyectos } from "../controllers/proyectosController.js";
import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Se enruta a las views

// Esta es la primer view que se va a tener al buscar localhost:3000 en el navegador:
router.get('/', (req, res)=> res.render('contaduria.ejs', { title: "Contaduria" }));

// Demas vistas para para el navbar
router.get('/index', (req, res) => res.render('index.ejs', { title: "Pinky Piensa Web" }));
router.get('/contaduria', (req, res) => res.render('contaduria.ejs', { title: "Contaduria" }));
router.get('/privacity', (req, res) => res.render('privacity.ejs', { title: "Privacity" }));
//router.get('/proyectos', (req, res) => res.render('proyectos.ejs', { title: "Proyectos" }));
// Para agregar los metodos crud de los objetos tengo
// que quitar el uso de estas rutas, porque se genera conflicto
// al hacer nuevos llamados de las views

// Llamadas para el controlador de users
router.get('/users', getUsuarios);
router.post('/users', crearUsuario);
router.get('/users/:id', detallesUsuario);
router.put('/users/:id', actualizarUsuario);
router.delete('/users/:id', eliminarUsuario);

// Llamadas para el controlador de proyectos
router.get('/proyectos', getProyectos);
router.post('/proyectos', crearProyecto);
router.get('/proyecto/:id', detallesProyecto);
router.put('/proyecto/:id', actualizarProyecto);
router.delete('/proyecto/:id', eliminarProyecto);

export default router;