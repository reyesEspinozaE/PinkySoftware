import express from 'express'
import { dirname, join } from 'path' // Con join podemos concatenar sin importar el SO
import { fileURLToPath } from 'url'
// Se importa el enrutador desde /routes/index.js
import indexRoutes from './routes/index.js'
// Importa tu archivo de asociaciones
import './models/associations.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)) // Con esto obtengo la ruta del proyecto

// Configuración del motor de plantillas y vistas
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs') // motor de plantilla ejs, en vez de html

// Configurar el middleware para servir archivos estáticos
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Uso de las rutas
app.use(indexRoutes);

console.log(__dirname);

// Servir archivos estáticos desde la carpeta public
app.use(express.static(join(__dirname, 'public')))

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });