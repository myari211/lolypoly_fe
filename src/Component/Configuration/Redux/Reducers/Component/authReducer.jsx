import staticMethods from "antd/es/message";
import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_REQUEST_SUCCESS, FETCH_LOGIN_REQUEST_FAILED } from "../../Action/authAction";


const initialState = {
    loading: false,
    data: [],
    error: [],
    isLogin: false,
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOGIN_REQUEST: 
            return {
                ...state,
                loading: true,
            }
        case FETCH_LOGIN_REQUEST_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: [],
                isLogin: true,
            }
        case FETCH_LOGIN_REQUEST_FAILED:
            return {
                loading: false,
                data: [],
                error: action.payload,
                isLogin: false,
            }
        default:
            return state;
    }
}

export default authReducer;