import { FETCH_PROVINCE_FAILED, FETCH_PROVINCE_REQUEST, FETCH_PROVINCE_SUCCESS } from "../../Action/areaAction";

const initialState = {
    loading: false,
    data: [],
    error: [],
}

const provinceReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PROVINCE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_PROVINCE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: [],
            }
        case FETCH_PROVINCE_FAILED:
            return {
                loading: false,
                data: [],
                error: action.payload,
            }
        default: return state;
    }
}

export default provinceReducer;