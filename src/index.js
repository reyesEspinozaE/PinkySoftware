// // Configuración para manejar la subida de imágenes
// app.post('/images/single', upload.single('imagenGasto'), (req, res) => {
//     console.log(req.file);
//     saveImage(req.file);
//     res.send('Termina img');
// });

// function saveImage(file) {
//     const newPath = `./uploads/${file.originalname}`;
//     fs.renameSync(file.path, newPath);
//     return newPath;
// }
// /src/index.js
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';
import './models/associations.js';
import multer from 'multer';
import fs from 'fs';
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
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(join(__dirname, '../../uploads')));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso de las rutas
app.use(indexRoutes);

console.log(__dirname);

// Servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
