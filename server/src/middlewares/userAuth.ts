import { Request, Response, NextFunction } from "express";
import { verify, VerifyErrors, Secret } from "jsonwebtoken";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const appSecret = process.env.APP_SECRET as Secret; // assuming APP_SECRET is a string

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
  verify(token, appSecret, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(403).send({ error: "Token invalido." });
    }

    req.body.userData = { email: decoded.email, role: decoded.role };
    next();
  });
};
