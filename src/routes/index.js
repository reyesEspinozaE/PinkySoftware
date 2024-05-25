import { Router } from "express";
// Importando el controlador de users
import { actualizarUsuario, crearUsuario, detallesUsuario, eliminarUsuario, getUsuarios } from "../controllers/usuariosController.js";
import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Se enruta a las views
router.get('/home', (req, res) => res.render('index.ejs', { title: "Pinky Piensa Web" }));
router.get('/index', (req, res) => res.render('index.ejs', { title: "Pinky Piensa Web" }));
router.get('/contaduria', (req, res) => res.render('contaduria.ejs', { title: "Contaduria" }));
router.get('/privacity', (req, res) => res.render('privacity.ejs', { title: "Privacity" }));
router.get('/proyectos', (req, res) => res.render('proyectos.ejs', { title: "Proyectos" }));

// Llamadas para el controlador de users
router.get('/users', getUsuarios);
router.post('/users', crearUsuario);
router.get('/users', detallesUsuario);
router.post('/users', actualizarUsuario);
router.delete('/users', eliminarUsuario);


export default router;