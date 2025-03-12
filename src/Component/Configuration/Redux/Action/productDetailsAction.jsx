import { get } from "../../Services/API/apiHelper";

export const FETCH_PRODUCT_DETAILS_REQUEST = 'FETCH_PRODUCT_DETAILS_REQUEST';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_PRODUCT_DETAILS_FAILURE = 'FETCH_PRODUCT_DETAILS_FAILURE';

export const fetchProductDetails = () => {
    return {
        type: FETCH_PRODUCT_DETAILS_REQUEST,
    }
}

export const fetchProductDetailsSuccess = (data) => {
    return {
        type: FETCH_PRODUCT_DETAILS_SUCCESS,
        payload: data,
    }
}

export const fetchProductDetailsFailure = (error) => {
    return {
        type: FETCH_PRODUCT_DETAILS_FAILURE,
        payload: error,
    }
}

export const fetchProduct = (id) => {
    return async(dispatch) => {
        dispatch(fetchProductDetails());

        const url = "/ecommerce/product/details/" + id;
        const response = await get({}, url);

        if(response.data.status == true) {
            dispatch(fetchProductDetailsSuccess(response.data.data));
            return response;
        }
        else {
            dispatch(fetchProductDetailsFailure(response.data.messages));
            console.error("Redux Error Fetch Product Details", response);
        }
    }
}