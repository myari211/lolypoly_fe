import { FETCH_DISTRICT_REQUEST, FETCH_DISTRICT_SUCCESS, FETCH_DISTRICT_FAILED } from "../../Action/areaAction";

const initialState = {
    loading: false,
    data: [],
    error: [],
}

const districtReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DISTRICT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_DISTRICT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: [],
            };
        case FETCH_DISTRICT_FAILED:
            return {
                loading: false,
                data: [],
                error: action.payload,
            }
        default: return state;
    }
}

export default districtReducer;