// import express from 'express';
// import { dirname, join } from 'path'; // Con join podemos concatenar sin importar el SO
// import { fileURLToPath } from 'url';
// // Se importa el enrutador desde /routes/index.js
// import indexRoutes from './routes/index.js';
// // Importa tu archivo de asociaciones
// import './models/associations.js';

// const app = express();
// const __dirname = dirname(fileURLToPath(import.meta.url)); // Con esto obtengo la ruta del proyecto

// // Configuración del motor de plantillas y vistas
// app.set('views', join(__dirname, 'views'));
// app.set('view engine', 'ejs'); // motor de plantilla ejs, en vez de html

// // Middleware para parsear solicitudes con cuerpos JSON y URL codificados
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Uso de las rutas
// app.use(indexRoutes);

// console.log(__dirname);

// // Servir archivos estáticos desde la carpeta public
// // Cualquier solicitud a / será manejada por este middleware, que buscará los archivos en la carpeta 'public'
// app.use(express.static(join(__dirname, 'public')));

// app.listen(3000, () => {
//     console.log('Server is listening on port 3000');
// });



import express from 'express';
import session from 'express-session';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';
import './models/associations.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de sesión
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Middleware para añadir el usuario a las vistas
app.use((req, res, next) => {
    res.locals.usuario = req.session.user;
    next();
});

app.use(indexRoutes);

app.use(express.static(join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
