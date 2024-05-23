import { Router } from "express";

const router = Router();

// Se enruta a las views
router.get('/home', (req, res) => res.render('index.ejs', { title: "Pinky Piensa Web" }));
router.get('/index', (req, res) => res.render('index.ejs', { title: "Pinky Piensa Web" }));
router.get('/contaduria', (req, res) => res.render('contaduria.ejs', { title: "Contaduria" }));
router.get('/privacity', (req, res) => res.render('privacity.ejs', { title: "Privacity" }));
router.get('/proyectos', (req, res) => res.render('proyectos.ejs', { title: "Proyectos" }));
router.get('/users', (req, res) => res.render('users.ejs', { title: "Usuarios" }));

// Ruta para la vista en la subcarpeta usersTemp
router.get('/src/views/usersTemp/index.ejs', (req, res) => res.render('/src/views/usersTemp/index.ejs', { title: "Usuarios temp" }));

export default router;