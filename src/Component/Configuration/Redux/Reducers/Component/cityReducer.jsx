import { FETCH_CITY_REQUEST, FETCH_CITY_SUCCESS, FETCH_CITY_FAILED } from "../../Action/areaAction";

const initialState = {
    loading: false,
    data: [],
    error: [],
}

const cityReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CITY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_CITY_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: [],
            }
        case FETCH_CITY_FAILED:
            return {
                loading: false,
                data: [],
                error: action.payload,
            }
        default: return state;
    }
}

export default cityReducer;