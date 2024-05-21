////////////////////////////////////////////////////////////////////////////
////  Pruebas de interaccion con la DB

// public/js/client.js
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('myButton').addEventListener('click', function () {
    alert('Button clicked!');
    // Llamar a más funciones aquí
    console.log('conecto bien');
  });
});

////////////////////////////////////////
import Proyecto from './models/Proyecto.js';

// Seleccionamos el botón por su id
var test = document.getElementById('test');

// Agregamos un evento onclick al botón
test.onclick = function () {
  nuevoProyecto();
}

const nuevoProyecto = async () => {
  try {
    const proyecto = await Proyecto.create({
      idPartida: 5,
      nombreProyecto: 'Nuevo Proyecto',
      descripcionProyecto: 'Descripción del nuevo proyecto',
      nombreEncargado: 'Juan Pérez',
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    });
    console.log('Proyecto creado:', proyecto);
  } catch (error) {
    console.error('Error creando proyecto:', error);
  }
};


////////////////////////////////////////////////////////////////////////////


// Seleccionamos el botón por su id
var btnAddProyecto = document.getElementById('btnAddProyecto');

// Agregamos un evento onclick al botón
btnAddProyecto.onclick = function () {
  // Ventana emergente
  var popup = window.open('', 'popup', 'width=400,height=300');

  // Contenido del formulario dentro de la ventana emergente
  var formContent = `
    <form>
        <label for="nombreProyecto">Nombre del Proyecto:</label><br>
        <input type="text" id="nombreProyecto" name="nombreProyecto"><br>

        <label for="descripcion">Descripción:</label><br>
        <textarea id="descripcion" name="descripcion" rows="4" cols="50"></textarea><br>

        <label for="partidasPresupuestarias">Partidas Presupuestarias:</label><br>
        <input type="text" id="partidasPresupuestarias" name="partidasPresupuestarias"><br>

        <label for="encargado">Encargado:</label><br>
        <input type="text" id="encargado" name="encargado"><br>

        <label for="fechaInicio">Fecha de Inicio:</label><br>
        <input type="date" id="fechaInicio" name="fechaInicio"><br>

        <label for="fechaFin">Fecha de Fin:</label><br>
        <input type="date" id="fechaFin" name="fechaFin"><br>

        <button type="submit">Guardar</button>
        <button type="button" onclick="cerrarPopup()">Cancelar</button>
    </form>
    `;

  // Escribimos el contenido del formulario en la ventana emergente
  popup.document.write(formContent);

  popup.document.querySelector('form').onsubmit = function (event) {
    event.preventDefault();
    // Aquí manejamos las acciones del form con el servidor
  };
};

// Función para actualizar la tabla de categorías
function actualizarTablaCategorias() {
  const tabla = document.getElementById("tablaCategorias");
  tabla.innerHTML = `
             <tr>
                <th>IdCategoria</th>
                <th>Nombre Categoría</th>
                <th>Presupuesto Mensual</th>
                <th>Acción</th>
            </tr>
        `;

  categorias.forEach(categoria => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
                 <td>${categoria.id}</td>
                 <td>${categoria.nombre}</td>
                 <td>${categoria.presupuestoMensual}</td>
                 <td>
                     <button onclick="editarCategoria(${categoria.id})">Editar</button>
                     <button onclick="borrarCategoria(${categoria.id})">Borrar</button>
                 </td>
             `;
    tabla.appendChild(fila);
  });
}

document.getElementById('mostrarFormulario').addEventListener('click', function () {
  document.getElementById('formulario').style.display = 'block';
});

// Array para almacenar las categorías de gastos
let categorias = [];

// Función para agregar una nueva categoría
function agregarCategoria() {
  const categoria = document.getElementById("categoria").value;
  const presupuestoTotal = parseFloat(document.getElementById("presupuestoTotal").value);

  // Verificar si la categoría ya existe
  const existeCategoria = categorias.find(cat => cat.nombre === categoria);

  if (existeCategoria) {
    alert("La categoría ya existe.");
    return;
  }

  // Crear el objeto de categoría
  const nuevaCategoria = {
    id: categorias.length + 1,
    nombre: categoria,
    presupuestoMensual: presupuestoTotal,
  };

  // Agregar la categoría al array
  categorias.push(nuevaCategoria);

  // Actualizar la tabla de categorías
  actualizarTablaCategorias();

  // Calcular y mostrar el presupuesto total
  calcularPresupuestoTotal();
}

// Función para calcular y mostrar el presupuesto total
function calcularPresupuestoTotal() {
  const total = categorias.reduce((acc, categoria) => acc + categoria.presupuestoMensual, 0);
  document.getElementById("totalPresupuesto").value = total.toFixed(2);

  // Calcular y mostrar el ahorro mensual
  const presupuestoTotal = parseFloat(document.getElementById("presupuestoTotal").value);
  const ahorroMensual = presupuestoTotal - total;
  document.getElementById("ahorroMensual").value = ahorroMensual.toFixed(2);
}

// Función para editar una categoría
function editarCategoria(id) {
  // Aquí puedes implementar la lógica para editar una categoría
  alert("Función de edición no implementada.");
}

// Función para borrar una categoría
function borrarCategoria(id) {
  // Aquí puedes implementar la lógica para borrar una categoría
  alert("Función de borrado no implementada.");
}

// Event listener para calcular el presupuesto total al cambiar el presupuesto total
document.getElementById("presupuestoTotal").addEventListener("input", calcularPresupuestoTotal);


// Operación de Creación (Create) para la tabla proyectos
function insertProyecto(proyecto) {
  const { nombreProyecto, descripcion, nombrePartidas, nombreEncargado, fechaInicio, fechaFin } = proyecto;
  const sql = 'INSERT INTO proyectos (nombreProyecto, descripcion, nombrePartidas, nombreEncargado, fechaInicio, fechaFin) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nombreProyecto, descripcion, nombrePartidas, nombreEncargado, fechaInicio, fechaFin], (err, result) => {
    if (err) throw err;
    console.log('Proyecto insertado correctamente');
  });
}

// Operación de Lectura (Read) para la tabla proyectos
function getProyectos() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM proyectos', (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

// Operación de Actualización (Update) para la tabla proyectos
function updateProyecto(idProyecto, newData) {
  const { nombreProyecto, descripcion, nombrePartidas, nombreEncargado, fechaInicio, fechaFin } = newData;
  const sql = 'UPDATE proyectos SET nombreProyecto = ?, descripcion = ?, nombrePartidas = ?, nombreEncargado = ?, fechaInicio = ?, fechaFin = ? WHERE idProyecto = ?';
  connection.query(sql, [nombreProyecto, descripcion, nombrePartidas, nombreEncargado, fechaInicio, fechaFin, idProyecto], (err, result) => {
    if (err) throw err;
    console.log('Proyecto actualizado correctamente');
  });
}

// Operación de Eliminación (Delete) para la tabla proyectos
function deleteProyecto(idProyecto) {
  const sql = 'DELETE FROM proyectos WHERE idProyecto = ?';
  connection.query(sql, [idProyecto], (err, result) => {
    if (err) throw err;
    console.log('Proyecto eliminado correctamente');
  });
}

// Función para mostrar todos los proyectos
function mostrarProyectos() {
  connection.query('SELECT * FROM proyectos', (err, result) => {
    if (err) throw err;
    console.log('Registros de proyectos:');
    result.forEach(proyecto => {
      console.log(`ID: ${proyecto.idProyecto}, Nombre: ${proyecto.nombreProyecto}, Descripción: ${proyecto.descripcion}, Encargado: ${proyecto.nombreEncargado}, Fecha Inicio: ${proyecto.fechaInicio}, Fecha Fin: ${proyecto.fechaFin}`);
    });
  });
}