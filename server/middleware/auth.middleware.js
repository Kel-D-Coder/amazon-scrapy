const jwt = require('jsonwebtoken');
const http = require('http-status-codes');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    !token && res.status(http.StatusCodes.UNAUTHORIZED).json({ msg: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid or expired token' });
    }

};


module.exports = authMiddleware;