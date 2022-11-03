const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: "No token authorization denied", code: 401 });
        };

        const decode = jwt.decode(token, process.env.JWTSECRET);

        req.user = decode.user;
        next();

    } catch (error) {
        console.error(error.message);
        res.status(401).json({ error: 'Token is not valid', code: 401 })
    }
}

module.exports = auth;