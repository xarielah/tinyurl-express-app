import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  return res.status(400).send(
    result.array({ onlyFirstError: true }).map((err) => {
      return {
        field: (err as { path: string }).path,
        message: err.msg,
      };
    })
  );
};
