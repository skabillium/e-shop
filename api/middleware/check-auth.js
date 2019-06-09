const jwt = require('jsonwebtoken');

// Authorization middleware that checks the header of the request for the 
// authentication token and throws error if it fails
module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

}