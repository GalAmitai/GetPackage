const jwt = require('jsonwebtoken');
const config = require('./../configuration/config');

const verifyJWTToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        let bearer = bearerHeader.split(' ')[1];
        try {
            const decode = jwt.verify(bearer, config.jwt.key);
            if (!decode.doc) {
                res.sendStatus(403);
                return;
            }
            req.headers['user'] = {
                id: decode.doc._id,
                username: decode.doc.username,
                type: decode.doc.type
            };
            return next();
        } catch (err) {
            res.status(401).json({
                status: 401,
                message : 'Unauthorized'
            });
            return;
        }
    } else {
        res.status(401).json({
            status: 401,
            message : 'Unauthorized'
        });
    }
}

module.exports = {
    verifyJWTToken
}