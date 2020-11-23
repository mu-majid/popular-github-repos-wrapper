import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

export interface IValidation {
  body?: Joi.SchemaLike;
  headers?: Joi.SchemaLike;
  query?: Joi.SchemaLike;
  cookies?: Joi.SchemaLike;
  params?: Joi.SchemaLike;
}


const validate = (schema: IValidation) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // options could be dynamic per erquest attribute (out of scope)
    const result = Joi.object().keys(<any>schema).validate(req, { abortEarly: false, allowUnknown: true });
    console.log('validation result : ', result);

    if (result.error) {
      const { details } = result.error;
      throw new RequestValidationError(details);
    }
    else {
      // assign value to request (if we were manipulating attributes)
      next();
    }
  }
}
module.exports = validate;