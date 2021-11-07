import express from 'express';
import WebSocket from 'ws';
import {
  getRecipes,
  getRecipeDetails,
  addRecipe,
  putRecipe
} from '../../models/process_data';

const recipes = express.Router();

recipes.get('/', async (req: express.Request, res: express.Response) => {
  const recipesList = getRecipes();
  console.log(recipesList);
  res.status(recipesList['status']);
  res.send(recipesList['body']);
});
recipes.get(
  '/details/:recipeName',
  async (req: express.Request, res: express.Response) => {
    const recipe = req.params.recipeName;
    const recipeDetails = getRecipeDetails(recipe);
    res.status(recipeDetails['status']);
    res.send(recipeDetails['body']);
  }
);
recipes.post('/', async (req: express.Request, res: express.Response) => {
  const response = addRecipe(req);
  res.status(response['status']);
  res.send(response['body']);
});
recipes.put('/', async (req: express.Request, res: express.Response) => {
  const response = putRecipe(req);
  res.status(response['status']);
  res.send(response['body']);
});

export default recipes;
