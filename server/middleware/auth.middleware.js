const jwt = require('jsonwebtoken');
const http = require('http-status-codes');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(http.StatusCodes.UNAUTHORIZED).json({ msg: "Please login", loginUrl: '/sign-in' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId
        next();
    } catch (error) {
        return res.status(http.StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid or expired token', loginUrl: '/sign-in' });
    }

};


module.exports = authMiddleware;