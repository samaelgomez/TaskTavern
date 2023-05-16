const router = require('express').Router();
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    if(req.headers.authorization) {
        req.userData = jwt.verify(JSON.parse(req.headers.authorization), process.env.SECRET_KEY, (err, verifiedJwt) => {
            return verifiedJwt;
        })
        next()
    } else {
        return res.status(401).send("401 Not Authorized");
    }
}

router.use('/users', require('./users'));
router.use('/tasks', authMiddleware, require('./tasks'));

module.exports = router;