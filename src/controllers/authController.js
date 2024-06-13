// /src/controllers/authController.js
import bcrypt from 'bcrypt';
import Usuario from '../models/usuario.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo: email } });
        console.log('Datos recibidos', { email, password });
        if (!usuario) {
            return res.status(401).json({ message: 'Correo o contraseña incorrecta.' });
        }

        // Compara la contraseña usando bcrypt
        const isMatch = await bcrypt.compare(password, usuario.contrasenia);

        if (!isMatch) {
            return res.status(401).json({ message: 'Correo o contraseña incorrecta.' });
        }

        // Establecer sesión
        req.session.isLoggedIn = true;
        req.session.rolUsuario = usuario.rol;
        req.session.nombreUsuario = usuario.nombreUsuario;

        res.status(200).json({
            message: 'Login exitoso.',
            nombreUsuario: usuario.nombreUsuario,
            rol: usuario.rol
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo: email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verifica si se proporcionó una nueva contraseña y se cifra
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            usuario.contrasenia = hashedPassword;
        }
        await usuario.save();

        res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};
