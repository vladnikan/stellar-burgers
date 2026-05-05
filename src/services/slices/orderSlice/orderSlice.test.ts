import { TOrder } from '@utils-types';
import { createOrder, fetchOrders, orderReducer } from './orderSlice';

const mockCreateOrderResponse = {
  success: true,
  name: 'Order #1',
  order: {
    _id: '1',
    status: 'ready',
    name: 'Order #1',
    createdAt: '2026-01-08',
    updatedAt: '10:10',
    number: 112,
    ingredients: ['bun', 'kotletka']
  }
};

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'ready',
    name: 'order',
    createdAt: '2026-01-08',
    updatedAt: '10:10',
    number: 112,
    ingredients: ['bun', 'kotletka']
  }
];

describe('orderlice test', () => {
  const initialState = {
    order: [],
    isLoading: false,
    error: null,
    orderRequest: false,
    orderModalData: null
  };

  test('fetch order.pending', () => {
    const state = orderReducer(
      initialState,
      fetchOrders.pending('id', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('fetch order.fulfilled', () => {
    const state = orderReducer(
      initialState,
      fetchOrders.fulfilled(mockOrders, 'id', undefined)
    );

    expect(state.error).toBe(null);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrders);
  });

  test('fetch order.rejected', () => {
    const state = orderReducer(
      initialState,
      fetchOrders.rejected(new Error('fetch order error'), 'id', undefined)
    );

    expect(state.error).toBeDefined();
    expect(state.isLoading).toBe(false);
  });
});

describe('create order', () => {
  const initialState = {
    order: [],
    isLoading: false,
    error: null,
    orderRequest: false,
    orderModalData: null
  };

  test('create order.pending', () => {
    const state = orderReducer(
      initialState,
      createOrder.pending('id', ['bun', 'kotleta'])
    );

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBe(null);
  });

  test('create order.fulfilled', () => {
    const state = orderReducer(
      initialState,
      createOrder.fulfilled(mockCreateOrderResponse, 'id', ['bun', 'kotleta'])
    );

    expect(state.error).toBe(null);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockCreateOrderResponse.order);
  });

  test('create order.rejected', () => {
    const state = orderReducer(
      initialState,
      createOrder.rejected(new Error('fetch order error'), 'id', [
        'bun',
        'kotleta'
      ])
    );

    expect(state.error).toBeDefined();
    expect(state.orderRequest).toBe(false);
  });
});
