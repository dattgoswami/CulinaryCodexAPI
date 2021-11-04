import supertest from 'supertest';
import app from '../../../src/index';

const request = supertest(app);

describe('recipes endpoint response test suite', () => {
  it('get recipes', async () => {
    const res = await request.get('/recipes');
    const recipes = { recipeNames: ['scrambledEggs', 'garlicPasta', 'chai'] };
    expect(res.status).toBe(200);
    expect(res.body).toEqual(recipes);
  });
  it('get details for recipe', async () => {
    const res = await request.get('/recipes/details/chai');
    const chaiRecipe = { details: { ingredients: [[Array]], numSteps: 4 } };
    expect(res.status).toBe(200);
    expect(res.body.details.numSteps).toEqual(chaiRecipe.details.numSteps);
  });
});
