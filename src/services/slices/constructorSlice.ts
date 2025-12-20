import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    }
  }
});

export const constructorReducer = constructorSlice.reducer;
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const { addIngredient } = constructorSlice.actions;
