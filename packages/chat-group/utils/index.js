const jwt = require('jsonwebtoken');

const checkFields = (...args) => {
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '' || args[i] === null || args[i] == undefined) {
            return false;
        }
    }
    return true;
};

const verifyJWT = (context, payload) => {
    try {
        const {authorization} = context.request.headers;
        if (!checkFields(authorization)) {
            return new Error("401: User is not authenticated");
        }
        const verifyToken = jwt.verify(authorization, process.env.SECRET_KEY);
        if (!verifyToken.email) {
            return new Error("401: User is not authenticated");
        }
        return payload();
    } catch (error) {
        return new Error("401: User is not authenticated");
    }
}

module.exports = {checkFields, verifyJWT};