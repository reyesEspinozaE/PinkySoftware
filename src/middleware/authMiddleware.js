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
        res.redirect('/index'); // Redirigir a la página de inicio si no es admin
    }
};

export const isGerente = (req, res, next) => {
    if (req.session && req.session.isLoggedIn && req.session.rolUsuario.toLowerCase() === 'gerente') {
        return next();
    } else {
        res.redirect('/index'); // Redirigir a la página de inicio si no es gerente
    }
};

export const isGuest = (req, res, next) => {
    if (req.session && req.session.isGuest) {
        if (req.path === '/index') {
            return next();
        } else {
            res.redirect('/index'); // Redirigir a la página de inicio si intenta acceder a otra ruta
        }
    } else {
        res.redirect('/'); // Redirigir a la página de inicio de sesión si no es invitado
    }
};
