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

export const checkRole =
  (allowRole: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req.body;

      if (!role) {
        return res
          .status(400)
          .json({ error: "Role is missing in the request body." });
      }

      if (allowRole !== role) {
        return res.status(401).json({
          error: "Unauthorized. You do not have access to this route.",
        });
      }

      next();
    } catch (error) {
      console.error("Error in checkRole middleware:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
