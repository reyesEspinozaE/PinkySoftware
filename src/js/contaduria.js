// Seleccionamos el botón por su id
var btnGasto = document.getElementById('btnGasto');

// Agregamos un evento onclick al botón
btnGasto.onclick = function () {
    // Ventana emergente
    var popup = window.open('', 'popup', 'width=400,height=300');

    // Contenido del formulario dentro de la ventana emergente
    var formContent = `
    <form>
        <label for="nombreGasto">Nombre del gasto:</label><br>
        <input type="text" id="nombreGasto" name="nombreGasto"><br>
    
        <label for="fechaGasto">Fecha del gasto:</label><br>
        <input type="date" id="fechaGasto" name="fechaGasto"><br>
    
        <label for="lugarGasto">Lugar del gasto:</label><br>
        <input type="number" id="lugarGasto" name="lugarGasto"><br>
    
        <label for="imagenGasto">Cargue su imagen:</label><br>
        <input type="file" id="imagenGasto" name="imagenGasto" accept="image/*"><br>
    
        <label for="montoGasto">Monto del gasto:</label><br>
        <input type="number" id="montoGasto" name="montoGasto"></input><br>
    
        <button type="submit">Guardar</button>
    </form>
    `;

    // Escribimos el contenido del formulario en la ventana emergente
    popup.document.write(formContent);

    popup.document.querySelector('form').onsubmit = function (event) {
        event.preventDefault();
        // Aquí manejamos las acciones del form con el servidor
    };
};

// Seleccionamos el botón por su id
var btnPresupuesto = document.getElementById('btnPresupuesto');

// Agregamos un evento onclick al botón
btnPresupuesto.onclick = function () {
    // Creamos la ventana emergente
    var popup = window.open('', 'popup', 'width=400,height=300');

    // Creamos el contenido del formulario dentro de la ventana emergente
    var formContent = `
    <form>
        <label for="nombrePresupuesto">Nombre del presupuesto:</label><br>
        <input type="text" id="nombrePresupuesto" name="nombrePresupuesto"><br>
    
        <label for="nombreProyecto">Nombre del proyecto:</label><br>
        <input type="text" id="nombreProyecto" name="nombreProyecto"><br>
    
        <label for="montotal">Monto total:</label><br>
        <input type="number" id="montotal" name="montotal"><br>
    
        <label for="saldoPendiente">Saldo pendiente:</label><br>
        <input type="number" id="saldoPendiente" name="saldoPendiente"><br>
    
        <label for="descripcion">Descripción:</label><br>
        <textarea id="descripcion" name="descripcion"></textarea><br>
    
        <button type="submit">Guardar</button>
    </form>
    `;

    // Escribimos el contenido del formulario en la ventana emergente
    popup.document.write(formContent);

    // Evitamos que el formulario realice una acción por defecto (como enviar datos)
    popup.document.querySelector('form').onsubmit = function (event) {
        event.preventDefault();
        // Aquí manejamos las acciones del form con el servidor
    };
};


//***************** CRUD GASTOS *****************

// Función de Crear (Create)
function crearGasto(gasto) {
    const query = 'INSERT INTO gastos SET ?';
    connection.query(query, gasto, (error, results, fields) => {
      if (error) throw error;
      console.log('Nuevo gasto creado:', results.insertId);
    });
  }
  
    // Función de Lectura (Read)
  function obtenerGastos() {
    const query = 'SELECT * FROM gastos';
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log('Gastos:', results);
    });
  }
  
  // Función de Actualización (Update)
  function actualizarGasto(idGasto, idProyecto, nuevosDatos) {
    const query = 'UPDATE gastos SET ? WHERE idGasto = ? AND idProyecto = ?';
    connection.query(query, [nuevosDatos, idGasto, idProyecto], (error, results, fields) => {
      if (error) throw error;
      console.log('Gasto actualizado:', results.affectedRows);
    });
  }
  
  // Función de Eliminación (Delete)
  function eliminarGasto(idGasto, idProyecto) {
    const query = 'DELETE FROM gastos WHERE idGasto = ? AND idProyecto = ?';
    connection.query(query, [idGasto, idProyecto], (error, results, fields) => {
      if (error) throw error;
      console.log('Gasto eliminado:', results.affectedRows);
    });
  }
  //***************** FIN CRUD GASTOS *****************
    // Función para mostrar todos los gastos
  function verTodosLosGastos() {
    const query = 'SELECT * FROM gastos';
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log('Todos los gastos:', results);
    });
  }
  

  //***************** CRUD PRESUPUESTOS *********************
  // Función de Crear (Create)
function crearPresupuesto(presupuesto) {
    const query = 'INSERT INTO presupuestos SET ?';
    connection.query(query, presupuesto, (error, results, fields) => {
      if (error) throw error;
      console.log('Nuevo presupuesto creado:', results.insertId);
    });
  }
  
    // Función de Lectura (Read)
  function obtenerPresupuestos() {
    const query = 'SELECT * FROM presupuestos';
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log('Presupuestos:', results);
    });
  }
  
  // Función de Actualización (Update)
  function actualizarPresupuesto(idPresupuesto, idProyecto, nuevosDatos) {
    const query = 'UPDATE presupuestos SET ? WHERE idPresupuesto = ? AND idProyecto = ?';
    connection.query(query, [nuevosDatos, idPresupuesto, idProyecto], (error, results, fields) => {
      if (error) throw error;
      console.log('Presupuesto actualizado:', results.affectedRows);
    });
  }
  
  // Función de Eliminación (Delete)
  function eliminarPresupuesto(idPresupuesto, idProyecto) {
    const query = 'DELETE FROM presupuestos WHERE idPresupuesto = ? AND idProyecto = ?';
    connection.query(query, [idPresupuesto, idProyecto], (error, results, fields) => {
      if (error) throw error;
      console.log('Presupuesto eliminado:', results.affectedRows);
    });
  }
  //***************** FIN CRUD PRESUPUESTOS *****************

  // Función para mostrar todos los preuspuestos
function verTodosLosPresupuestos() {
    const query = 'SELECT * FROM presupuestos';
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log('Todos los presupuestos:', results);
    });
  }