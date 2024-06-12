import express from 'express';
import { dirname, join } from 'path'; // Con join podemos concatenar sin importar el SO
import { fileURLToPath } from 'url';
// Se importa el enrutador desde /routes/index.js
import indexRoutes from './routes/index.js';
// Importa tu archivo de asociaciones
import './models/associations.js';
import multer from 'multer';
import fs from 'node:fs';
import expressSession from 'express-session';

// {dest: 'uploads/'}, es para obtener las rutas de los ficheros (IMG)
const upload = multer({ dest: 'uploads/' });

const app = express();

// Recibir las peticiones de IMG
app.post('/images/single', upload.single('imagenGasto'), (req, res) => {
    console.log(req.file);
    saveImage(req.file);
    res.send('Termina img');
});

// Funcion para recibir los datos de las img
function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

// Con esto obtengo la ruta del proyecto, en mi local  (PC)
// Es decir la ruta de almacenamiento
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración del motor de plantillas y vistas
app.set('views', join(__dirname, 'views'));

// Motor de plantilla ejs, en vez de html
app.set('view engine', 'ejs');

// Middleware para parsear solicitudes con cuerpos JSON y URL codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso de las rutas
app.use(indexRoutes);

console.log(__dirname);

// Servir archivos estáticos desde la carpeta public
// Cualquier solicitud a / será manejada por este middleware, que buscará los archivos en la carpeta 'public'
app.use(express.static(join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

// import express from 'express';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
// import indexRoutes from './routes/index.js';
// import './models/associations.js';
// import expressSession from 'express-session';

// const app = express();
// const session = expressSession();

// // Con esto obtengo la ruta del proyecto, en mi local (PC)
// const __dirname = dirname(fileURLToPath(import.meta.url));

// // Configuración del motor de plantillas y vistas
// app.set('views', join(__dirname, 'views'));

// // Motor de plantilla ejs, en vez de html
// app.set('view engine', 'ejs');

// // Middleware para parsear solicitudes con cuerpos JSON y URL codificados
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Uso de las rutas
// app.use(indexRoutes);

// console.log(__dirname);

// // Servir archivos estáticos desde la carpeta public
// app.use(express.static(join(__dirname, 'public')));

// // Importar y usar el controlador de gastos
// import { crearGasto } from './controllers/contaduriaController.js';

// // Ruta para manejar la creación del gasto con imagen
// app.post('/gastos', crearGasto);

// app.listen(3000, () => {
//     console.log('Server is listening on port 3000');
// });
