import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../../store';
import { v4 as uuid } from 'uuid';

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
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient) {
        return {
          payload: {
            ...ingredient,
            uniqueId: uuid()
          }
        };
      }
    },

    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    switchIngredients(state) {}
  }
});

export const constructorReducer = constructorSlice.reducer;
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const { removeIngredient } = constructorSlice.actions;

export const { addIngredient } = constructorSlice.actions;

export const { clearConstructor } = constructorSlice.actions;
