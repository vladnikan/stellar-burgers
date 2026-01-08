import { TIngredient } from '@utils-types';
import { ingredientReducer } from './ingredientSlice';
import { fetchIngredients } from './ingredientSlice';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('feedSlice test', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  test('ingredient.pending', () => {
    const state = ingredientReducer(
      initialState,
      fetchIngredients.pending('id', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('ingredient.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Cheese',
        type: 'main',
        price: 50,
        image: 'cheese.png',
        image_large: 'cheese-large.png',
        image_mobile: 'cheese-mobile.png',
        proteins: 10,
        fat: 20,
        carbohydrates: 5,
        calories: 300
      }
    ];

    const state = ingredientReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, 'id', undefined)
    );

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  test('ingredient.rejected', () => {
    const state = ingredientReducer(
      initialState,
      fetchIngredients.rejected(new Error('error123'), 'id', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeDefined();
  });
});
