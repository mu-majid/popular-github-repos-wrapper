import { IValidation } from "../interfaces";
import Joi from 'joi';

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
      .example('desc')

  }).optional()
};