import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { ApiError } from "../utils/ApiError";

export function authorize(...roles: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new ApiError(401, "Not authenticated"));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new ApiError(403, "Not authorized for this action"));
      return;
    }

    next();
  };
}
