import { FETCH_PRODUCT_DETAILS_REQUEST, FETCH_PRODUCT_DETAILS_SUCCESS, FETCH_PRODUCT_DETAILS_FAILURE } from "../../Action/productDetailsAction";

const initialState = {
    loading: false,
    data: [],
    error: [],
}

const productDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: [],
            }
        case FETCH_PRODUCT_DETAILS_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            }
        default: return state;
    }
}

export default productDetailsReducer;