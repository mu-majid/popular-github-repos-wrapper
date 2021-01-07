import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';

import { popularReposRouter } from './routes/list-popular-repos.controller';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found';


// cookie here is for transporting jwt
const app = express();
app.use(cors());
app.use(json());
app.use(popularReposRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3001, () => {
  console.log('Popular repos Server on port 3001!!!');
});

export default app;