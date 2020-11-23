import express, { Request, Response } from 'express';
import { validate } from '../middlewares/validate';
import { listPopularRepos } from '../validation-schemas';
import github from '../third-party/github-api';

const router = express.Router();

router.get(
  '/api/repos',
  validate(listPopularRepos),

  async (req: Request, res: Response) => {
    try {
      console.log('hello ')
      const { sort, order, page, per_page } = req.query;
      const { data } = await github.get('/search/repositories', {
        params: {
          q: 'tetris+language:assembly',
          sort,
          order,
          page,
          per_page
        }
      });

      return res.status(200).send(data);
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  });

export { router as popularReposRouter };