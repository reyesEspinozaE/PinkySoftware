// Función de Crear (Create)
function insertUsuario(usuario) {
    const { nombreUsuario, correo, contrasenia, rol } = usuario;
    const sql = 'INSERT INTO usuarios (nombreUsuario, correo, contrasenia, rol) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nombreUsuario, correo, contrasenia, rol], (err, result) => {
      if (err) throw err;
      console.log('Usuario insertado correctamente');
    });
  }
  
  // Función de Lectura (Read)
  function getUsuarios() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM usuarios', (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  // Función de Actualización (Update)
  function updateUsuario(idUsuario, newData) {
    const { nombreUsuario, correo, contrasenia, rol } = newData;
    const sql = 'UPDATE usuarios SET nombreUsuario = ?, correo = ?, contrasenia = ?, rol = ? WHERE idUsuario = ?';
    connection.query(sql, [nombreUsuario, correo, contrasenia, rol, idUsuario], (err, result) => {
      if (err) throw err;
      console.log('Usuario actualizado correctamente');
    });
  }
  
  // Función de Eliminación (Delete)
  function deleteUsuario(idUsuario) {
    const sql = 'DELETE FROM usuarios WHERE idUsuario = ?';
    connection.query(sql, [idUsuario], (err, result) => {
      if (err) throw err;
      console.log('Usuario eliminado correctamente');
    });
  }
  
  // Función para mostrar todos los usuarios
  function mostrarUsuarios() {
    connection.query('SELECT * FROM usuarios', (err, result) => {
      if (err) throw err;
      console.log('Registros de usuarios:');
      result.forEach(usuario => {
        console.log(`ID: ${usuario.idUsuario}, Nombre: ${usuario.nombreUsuario}, Correo: ${usuario.correo}, Rol: ${usuario.rol}`);
      });
    });
  }
  