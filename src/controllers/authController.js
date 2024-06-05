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

        res.status(200).json({ message: 'Login exitoso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo: email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Aquí puedes enviar un correo electrónico al usuario con un token de restablecimiento de contraseña.
        res.status(200).json({ message: 'Correo de recuperación enviado.' });
    } catch (error) {
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

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        usuario.contrasenia = hashedPassword;
        await usuario.save();

        res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};
