import express, { Request, Response } from 'express';
import { validate } from '../middlewares/validate';
import { listPopularRepos } from './validation-schemas';
import github from '../third-party/github-api';
import { BadRequestError } from '../errors/bad-request';
import { formatSearchQuery } from '../services/list-popular-repos.service';
import { GithubError } from '../errors/github-validation-error';

const router = express.Router();

router.get(
  '/api/repos',
  validate(listPopularRepos),

  async (req: Request, res: Response) => {
    try {
      const { searchText, sort, order, page, per_page, language, createdAt } = req.query;
      const searchQuery = formatSearchQuery(
        <string>searchText,
        <string[]>language,
        <string>createdAt
      );
      console.log(searchQuery)
      const response = await github.get('/search/repositories', {
        params: {
          q: searchQuery,
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
      if (error.isAxiosError) {
        throw new GithubError(error.response.data);
      }

      throw new BadRequestError(error.message);
      
    }
  });

export { router as popularReposRouter };