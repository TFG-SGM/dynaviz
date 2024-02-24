import { Request, Response, NextFunction } from "express";
import { verify, VerifyErrors, Secret } from "jsonwebtoken";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const appSecret = process.env.APP_SECRET as Secret; // assuming APP_SECRET is a string

  if (!authHeader) {
    return res.status(403).send({ error: "Authorization header is missing." });
  }

  const tokenParts = authHeader.split(" ");
  console.log(tokenParts);
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(403)
      .send({ error: "Invalid authorization header format..." });
  }

  const token = tokenParts[1];
  verify(token, appSecret, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).send({ error: "Invalid token." });
    }

    req.body.role = decoded.role;
    console.log("Token decoded:", decoded);
    next();
  });
};
