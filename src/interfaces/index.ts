import Joi from 'joi';

export interface IValidation {
  body?: Joi.SchemaLike;
  headers?: Joi.SchemaLike;
  query?: Joi.SchemaLike;
  cookies?: Joi.SchemaLike;
  params?: Joi.SchemaLike;
}
