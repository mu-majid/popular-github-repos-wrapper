import express, { Request, Response } from 'express';
import { validate } from '../middlewares/validate';
import { listPopularRepos } from '../validation-schemas';
import github from '../third-party/github-api';
import { BadRequestError } from '../errors/bad-request';

const router = express.Router();

router.get(
  '/api/repos',
  validate(listPopularRepos),

  async (req: Request, res: Response) => {
    try {
      const { sort, order, page, per_page, language } = req.query;
      const response = await github.get('/search/repositories', {
        params: {
          q: `${language ? 'language:'+language : '*'}`,
          sort,
          order,
          page,
          per_page
        }
      });

      return res.status(200).send(response.data);
    }
    catch (error) {
      // TODO: Should be replaced by a proper logger
      console.log('Axios Error : ', error.response.data);

      throw new BadRequestError(error.isAxiosError ? error.response.data.message : error.message);
    }
  });

export { router as popularReposRouter };