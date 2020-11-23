import Joi from 'joi';

export const stringArraySchema = (<any>Joi).extend((joi: any) => ({
  base: joi.array().meta({ baseType: 'string' }),
  type: 'stringArray',
  coerce: (value: string) => ({
    value: value.split ? value.split(',').map((v: string) => v.trim()) : value
  })
}));