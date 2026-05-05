import { TOrder, TOrdersData } from '@utils-types';
import { feedReducer, getFeed } from './feedSlice';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Order #1',
    createdAt: '2026-01-08',
    updatedAt: '2026-01-08',
    number: 123,
    ingredients: ['bun', 'kotletka']
  }
];

const mockFeed: TOrdersData = {
  orders: mockOrders,
  total: 25,
  totalToday: 50
};

describe('feedSlice test', () => {
  const initialState = {
    data: null,
    isLoading: true,
    error: null
  };

  test('fetchFeed.pending', () => {
    const state = feedReducer(initialState, getFeed.pending('id', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('fetchFeed.fulfilled', () => {
    const state = feedReducer(
      initialState,
      getFeed.fulfilled(mockFeed, 'id', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.data).toEqual(mockFeed);
  });

  test('fetchFeed.rejected', () => {
    const state = feedReducer(
      initialState,
      getFeed.rejected(new Error('fetchFeed error'), 'id', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeDefined();
  });
});
