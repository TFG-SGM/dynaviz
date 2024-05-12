"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const userAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const appSecret = process.env.APP_SECRET; // assuming APP_SECRET is a string
    if (!authHeader) {
        return res
            .status(403)
            .send({ error: "No está la cabecera de autorización." });
    }
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(403).send({
            error: "La cabecera de autorización tiene un formato invalido.",
        });
    }
    const token = tokenParts[1];
    (0, jsonwebtoken_1.verify)(token, appSecret, (err, decoded) => {
        if (err) {
            return res.status(403).send({ error: "Token invalido." });
        }
        req.body.userData = { email: decoded.email, role: decoded.role };
        next();
    });
};
exports.userAuth = userAuth;
