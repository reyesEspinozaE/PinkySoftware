// /src/middleware/authMiddleware.js
export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        return next();
    } else {
        res.redirect('/'); // Redirigir a la página de inicio de sesión si no está autenticado
    }
};

export const isAdmin = (req, res, next) => {
    if (req.session && req.session.isLoggedIn && req.session.rolUsuario.toLowerCase() === 'admin') {
        return next();
    } else {
        res.redirect('/'); // Redirigir a la página de inicio de sesión si no es admin
    }
};
