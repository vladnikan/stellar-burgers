import {
  addIngredient,
  removeIngredient,
  constructorReducer
} from './constructorSlice';

const mockBun = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  price: 100,
  image: 'url'
};

describe('constructor slice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('добавление ингредиента', () => {
    const newState = constructorReducer(initialState, addIngredient(mockBun));

    expect(newState.bun).toMatchObject({
      _id: '1',
      name: 'Булка',
      type: 'bun',
      price: 100,
      image: 'url'
    });

    expect(newState.ingredients).toEqual([]);
  });

  it('удаление ингредиента', () => {
    const newState = constructorReducer(initialState, removeIngredient(0));

    expect(newState.bun).toEqual(null);
  });

  //еще добавить изменение в конструкторе.
});
