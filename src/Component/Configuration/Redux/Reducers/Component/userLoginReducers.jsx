import { FETCH_USER_INFORMATION_FAILURE, FETCH_USER_INFORMATION_SUCCESS, FETCH_USER_INFORMATION_REQUEST } from "../../Action/userLoginAction";

const initialState = {
    loading: false,
    data: [],
    error: [],
}

const userLoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_INFORMATION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USER_INFORMATION_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: [],
            }
        case FETCH_USER_INFORMATION_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        default: 
            return state;
    }
}

export default userLoginReducer;