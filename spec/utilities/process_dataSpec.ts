import { getRecipes, getRecipeDetails } from '../../src/utilities/process_data';

describe('test suite for function process data', () => {
  it('should return list of all recipes when called', () => {
    const result = getRecipes();
    const recipes = {
      recipeNames: ['scrambledEggs', 'garlicPasta', 'chai']
    };
    expect(result).toEqual(recipes);
  });
  it('should return list of all recipes when called', () => {
    const result = getRecipeDetails('pizza');
    const emptyResult = {};
    expect(result).toEqual(emptyResult);
  });
});
