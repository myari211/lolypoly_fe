const initialState = {
    products: {},
}

const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const productStateReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.payload.id]: action.payload,
                },
            };

        case UPDATE_QUANTITY:
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.payload.id]: {
                        ...state.products[action.payload.id],
                        quantity: action.payload.quantity,
                    },
                },
            };

        case REMOVE_PRODUCT:
            const {[action.payload] : removed, ...remainingProducts} = state.products;
            return {
                ...state,
                products: remainingProducts,
            };
            default:
                return state;
            
    }
}

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product,
});

export const updateQuantity = (productId, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: {id: productId, quantity},
});

export const removeProduct = (productId) => ({
    type: REMOVE_PRODUCT,
    payload: productId,
});