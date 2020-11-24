import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { IValidation } from '../interfaces';



export const validate = (schema: IValidation) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // options could be dynamic per erquest attribute (out of scope)
    const result = Joi.object().keys(<any>schema).validate(req, { abortEarly: false, allowUnknown: true });

    if (result.error) {
      const { details } = result.error;
      throw new RequestValidationError(details);
    }
    else {
      // assign value to request (if we were manipulating attributes)
      Object.assign(req, result.value);
      next();
    }
  }
}
