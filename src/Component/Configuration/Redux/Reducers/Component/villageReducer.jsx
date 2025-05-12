import { FETCH_VILLAGE_REQUEST, FETCH_VILLAGE_SUCCESS, FETCH_VILLAGE_FAILED } from "../../Action/areaAction";

const initialState = {
    loading: false,
    data: [],
    error: [],
}

const villageReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_VILLAGE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_VILLAGE_SUCCESS:
            return {
                loading:false,
                data: action.payload,
                error: [],
            }
        case FETCH_VILLAGE_FAILED:
            return {
                loading: false,
                data: [],
                error: action.payload,
            }
        default: return state;
    }
}

export default villageReducer;