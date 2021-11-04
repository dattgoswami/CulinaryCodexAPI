import json from '../assets/data.json';
import express from 'express';
import { resourceLimits } from 'worker_threads';

function getRecipeSet() {
  let recipesSet = new Set<string>();
  for (let i = 0; i < json.recipes.length; i++) {
    recipesSet.add(json.recipes[i].name);
  }
  return recipesSet;
}
function getRecipes() {
  let recipesSet = getRecipeSet();
  let result: any = {
    recipeNames: []
  };
  recipesSet.forEach(function (recipeName: string) {
    result['recipeNames'].push(recipeName);
  });
  return result;
}
function getRecipeDetails(recipeName: string) {
  let recipeExist: boolean = false;
  let recipesSet = getRecipeSet();
  const result: any = {
    details: {
      ingredients: [],
      numSteps: ''
    }
  };
  if (recipesSet.has(recipeName)) {
    for (let i = 0; i < json.recipes.length; i++) {
      if (json.recipes[i].name === recipeName) {
        recipeExist = true;
        result.details.ingredients.push(json.recipes[i].ingredients);
        result.details.numSteps = json.recipes[i].instructions.length;
      }
    }
  }
  if (!recipeExist) {
    return {};
  }
  console.log(result);
  return result;
}
//post
function addRecipe(req: express.Request) {
  let recipesSet = getRecipeSet();

  if (!recipesSet.has(req.body.name)) {
    const newRecipe = {
      name: '',
      ingredients: [],
      instructions: []
    };
    newRecipe.name = req.body.name;
    newRecipe.ingredients = req.body.ingredients;
    newRecipe.instructions = req.body.instructions;
    json.recipes[json.recipes.length] = newRecipe;
    console.log(json);
    return 201;
  } else {
    return 400;
  }
}
function putRecipe(req: express.Request) {
  let recipesSet = getRecipeSet();
  let recipeName = req.body.name;
  if (recipesSet.has(recipeName)) {
    const updateRecipe = {
      name: '',
      ingredients: [],
      instructions: []
    };
    updateRecipe.name = recipeName;
    updateRecipe.ingredients = req.body.ingredients;
    updateRecipe.instructions = req.body.instructions;
    for (let i = 0; i < json.recipes.length; i++) {
      if (json.recipes[i].name === recipeName) {
        json.recipes[i] = updateRecipe;
      }
    }
    console.log(json);
    return 204;
  } else {
    return 404;
  }
}
export { getRecipes, getRecipeDetails, addRecipe, putRecipe };
