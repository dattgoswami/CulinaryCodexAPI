import express from 'express';
import WebSocket from 'ws';
import {
  getRecipes,
  getRecipeDetails,
  addRecipe,
  putRecipe
} from '../../utilities/process_data';

const recipes = express.Router();

recipes.get('/', async (req: express.Request, res: express.Response) => {
  const recipesList = getRecipes();
  console.log(recipesList);
  res.status(200);
  res.send(recipesList);
});
recipes.get(
  '/details/:recipeName',
  async (req: express.Request, res: express.Response) => {
    const recipe = req.params.recipeName;
    const recipeDetails = getRecipeDetails(recipe);
    res.status(200);
    res.send(recipeDetails);
  }
);
recipes.post('/', async (req: express.Request, res: express.Response) => {
  const response = addRecipe(req);
  if (response === 400) {
    const errorMessage = {
      error: 'Recipe already exists'
    };
    res.send(errorMessage);
  } else {
    res.status(response).send();
  }
});
recipes.put('/', async (req: express.Request, res: express.Response) => {
  const response = putRecipe(req);
  if (response === 404) {
    const errorMessage = {
      error: 'Recipe does not exists'
    };
    res.send(errorMessage);
  } else {
    res.status(response).send();
  }
});

export default recipes;
