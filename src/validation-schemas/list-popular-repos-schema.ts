import { IValidation } from "../interfaces";
import Joi from 'joi';
import { stringArraySchema } from "./extend-joi";

export const listPopularRepos: IValidation = {
  query: Joi.object().keys({

    sort: Joi.string()
      .default('stars')
      .valid('stars')
      .description('Sorts the results of your query by number of stars.'),

    order: Joi.string()
      .valid('asc', 'desc')
      .default('desc')
      .when('sort', { is: Joi.exist(), then: Joi.string().default('desc'), otherwise: Joi.optional() })
      .description('the order of the performed sort. it will be applied to all attributes provided in the sort array.')
      .example('desc'),

    page: Joi.number()
      .default(1)
      .optional()
      .description('Specify page to retrieve'),

    per_page: Joi.number()
      .default(30) // github default
      .max(100)
      .optional()
      .description('Specifies number of elements to retrive from github'),

    language: stringArraySchema
      .stringArray()
      .items(
        Joi.string()
      )
      .description('filter repos written in a specifc language.')

  }).optional()
};