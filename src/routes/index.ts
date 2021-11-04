import express from 'express';
import recipes from './api/recipes';

//routes object that will be applied to endpoint /api
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('endpoint currently available is totals');
});

routes.use('/recipes', recipes);

export default routes;
