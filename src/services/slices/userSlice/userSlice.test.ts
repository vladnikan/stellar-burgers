import {
  fetchUser,
  login,
  logout,
  register,
  updateUser,
  userReducer
} from './userSlice';
const mockUser = {
  name: 'Vlad',
  email: 'email@email.com'
};

const mockLogin = {
  email: 'vlad@mail.ru',
  password: '123456'
};

const mockUserRegister = {
  name: 'vlad',
  email: 'vlad@mail.ru',
  password: '123456'
};

describe('userSlice fetchUser test', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isLoading: true,
    error: undefined
  };

  test('user.pending', () => {
    const state = userReducer(initialState, fetchUser.pending('id', undefined));

    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  test('user.fulfilled', () => {
    const state = userReducer(
      initialState,
      fetchUser.fulfilled(mockUser, 'id', undefined)
    );

    expect(state.isAuth).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBe(undefined);
  });

  test('user.rejected', () => {
    const state = userReducer(
      initialState,
      fetchUser.rejected(new Error('user rejected'), 'id', undefined)
    );

    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeDefined();
  });
});

describe('userSlice login test', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isLoading: true,
    error: undefined
  };

  test('login user.pending', () => {
    const state = userReducer(
      initialState,
      login.pending('id', { email: 'vlad@maik.ru', password: '12345' })
    );

    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  test('login user.fulfilled', () => {
    const state = userReducer(
      initialState,
      login.fulfilled(mockUser, 'id', {
        email: 'vlad@mail.ru',
        password: '12345'
      })
    );

    expect(state.isAuth).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBe(undefined);
  });

  test('login user.rejected', () => {
    const state = userReducer(
      initialState,
      login.rejected(new Error('user rejected'), 'id', {
        email: 'vlad@mail.ru',
        password: '12345'
      })
    );

    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeDefined();
  });
});

describe('userSlice register test', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isLoading: true,
    error: undefined
  };

  test('register user.pending', () => {
    const state = userReducer(
      initialState,
      register.pending('id', { name: '', email: '', password: '' })
    );

    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  test('register user.fulfilled', () => {
    const state = userReducer(
      initialState,
      register.fulfilled(mockUser, 'id', { name: '', email: '', password: '' })
    );

    expect(state.isAuth).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBe(undefined);
  });

  test('register user.rejected', () => {
    const state = userReducer(
      initialState,
      register.rejected(new Error('user rejected'), 'id', {
        name: '',
        email: '',
        password: ''
      })
    );

    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeDefined();
  });
});

describe('userSlice update user test', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isLoading: true,
    error: undefined
  };
  test('update user.fulfilled', () => {
    const state = userReducer(
      { ...initialState, user: mockUser, isAuth: true },
      updateUser.fulfilled({ name: 'new', email: 'new@email.com' }, '', {})
    );

    expect(state.user).toEqual({ name: 'new', email: 'new@email.com' });
    expect(state.isAuth).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });
});

describe('userSlice logout user test', () => {
  const authState = {
    user: null,
    isAuth: true,
    isLoading: false,
    error: undefined
  };

  test('logout user.fulfilled', () => {
    const state = userReducer(authState, logout.fulfilled(undefined, ''));

    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBe(undefined);
  });
});
