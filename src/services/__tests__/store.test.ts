import { rootReducer } from "../store";

describe('rootReducer', () => {
    test('rootReducer returns IS', () => {
        const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

        expect(newState).toEqual({
            user: {
                user: null,
                isAuth: false,
                isLoading: true,
                error: undefined
            },
            burgerConstructor: {
                bun: null,
                ingredients: []
            },
            ingredients: {
                ingredients: [],
                isLoading: true,
                error: null
            },
            feed: {
                data: null,
                isLoading: true,
                error: null
            },
            order: {
                order: [],
                isLoading: true,
                error: null,
                orderRequest: false,
                orderModalData: null
            }
        });
    });
});