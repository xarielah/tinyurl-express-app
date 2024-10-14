import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(`${req.url} - Validation errors: ${result.array()}`);
    return res.status(400).send({
      errors: result.array({ onlyFirstError: true }).map(mapErrors),
    });
  }
  return next();
};

function mapErrors(err: any) {
  return {
    target: (err as { path: string }).path,
    message: err.msg,
  };
}
