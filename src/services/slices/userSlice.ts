import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../store';

interface UserState {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: true,
  error: undefined
};

export const fetchUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// export const forgotPassword = createAsyncThunk(
//   'user/forgotPassword',
//   async
// )

// export const resetPassword = createAsyncThunk(
//   'user/reset',
//   async
// )

// export const updateUser = createAsyncThunk(
//   'user/update',
//   async
// )

// export const logout = createAsyncThunk(
//   'user/logout',
//   async
// )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser(state, action) {
    //   state.user = action.payload;
    //   state.isAuth = true;
    // },
    // updateUser(state, action) {
    //   state.user = action.payload;
    // },
    logout(state) {
      (state.user = null), (state.isAuth = false);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message ?? 'Error';
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message ?? 'Error';
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message ?? 'Error';
      });
  }
});

export const { logout } = userSlice.actions;

export const selectIsAuth = (state: RootState) => state.user.isAuth;

//TODO: у нас уже есть состояние аунтификации, остается создать SecuredRoute, в который будем передавать это для нужных страниц, по идее, на этом мы закончим
//в модалке заказов не отображается информация о заказе

export const userReducer = userSlice.reducer;
