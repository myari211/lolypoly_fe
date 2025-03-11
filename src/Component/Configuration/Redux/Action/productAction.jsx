export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchProduct = () => {
    return {
        type : FETCH_PRODUCT_REQUEST,
    }
}

export const fetchProductSuccess = (data) => {
    return {
        type : FETCH_PRODUCT_SUCCESS,
        payload: data,
    }
}

export const fetchProductFailure = (error) => {
    return {
        type : FETCH_PRODUCT_FAILURE,
        payload: error,
    }
}