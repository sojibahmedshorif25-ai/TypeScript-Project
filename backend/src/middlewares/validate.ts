import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error: unknown) {
      const zodError = error as { errors?: Array<{ message: string; path: (string | number)[] }> };
      if (zodError.errors) {
        const message = zodError.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
        next(new (require("../utils/ApiError").ApiError)(400, message));
      } else {
        next(error);
      }
    }
  };
}
