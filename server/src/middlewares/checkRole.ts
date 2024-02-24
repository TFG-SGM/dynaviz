import { Request, Response, NextFunction } from "express";

export const checkRole =
  (allowRole: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req.body;
      delete req.body["role"];

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
