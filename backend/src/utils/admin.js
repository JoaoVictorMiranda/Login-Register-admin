export function apenasAdmin(req, res, next) {
    if (req.user && req.user.tipo === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Apenas administradores podem fazer isso!' });
    }
}