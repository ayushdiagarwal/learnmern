const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


// after the user has signed in, they are assigned a jwt which is their validation token and will be used for future operations
const validateToken = asyncHandler(async(req,res, next) => {
    let token;
    let authHeader = req.header.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split("")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next(); // carries on the next function
        });
    }
    if (!token) {
        req.status(401);
        throw new Error("User is not authorized or token is missing in the request");
    }
});

module.exports = validateToken;