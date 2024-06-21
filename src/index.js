import './models/associations.js';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';
import expressSession from 'express-session';

// Obtener el directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url));

// Crear la aplicación de Express
const app = express();

// Configuración de sesiones
app.use(expressSession({
    secret: 'this_is_a_super_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a true si se usa HTTPS
}));

// Middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Middleware de depuración para verificar solicitudes a 'uploads'
app.use('/uploads', (req, res, next) => {
    console.log(`Request for ${req.path}`);
    next();
});

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso de las rutas
app.use(indexRoutes);

// Servir archivos estáticos, desde la carpeta "src/public"
app.use(express.static(join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
