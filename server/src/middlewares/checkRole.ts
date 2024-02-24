import { Request, Response, NextFunction } from "express";

export const checkRole =
  (allowRole: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req.body.userData;

      console.log(allowRole);
      if (!role) {
        return res
          .status(400)
          .json({ error: "No has sido autentificado correctamente." });
      }

      if (allowRole !== role) {
        return res.status(401).json({
          error: "No autorizado para acceder a esta ruta.",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
