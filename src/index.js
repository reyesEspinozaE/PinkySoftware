import express from 'express'
import {dirname, join} from 'path' // Con join podemos concatenar sin importar el SO
import { fileURLToPath } from 'url'

// Se exporta el enrutador desde /routes/index.js
import indexRoutes from './routes/index.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)) // Con esto obtengo la ruta del proyecto

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(indexRoutes);

console.log(__dirname);

app.use(express.static(join(__dirname, 'public')))

//app.get('/', (req, res) => res.render('index.ejs'));

app.listen(3000)
console.log('Server is listening on port', 3000);