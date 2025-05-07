import { data } from "react-router-dom";
import { post } from "../../Services/API/apiHelper";
import { ModalPopUp } from "../../Services/Alert/alertHelper";

export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_REQUEST_SUCCESS = 'FETCH_LOGIN_REQUEST_SUCCESS';
export const FETCH_LOGIN_REQUEST_FAILED = 'FETCH_LOGIN_REQUEST_FAILED';

export const fetchSendLoginRequest = () => {
    return {
        type: FETCH_LOGIN_REQUEST,
    }
}

export const fetchSendLoginSuccess = (data) => {
    return {
        type: FETCH_LOGIN_REQUEST_SUCCESS,
        payload: data,
    }
}

export const fetchSendLoginFailure = (error) => {
    return {
        type: FETCH_LOGIN_REQUEST_FAILED,
        payload: error,
    }
} 

export const fetchLogin = (data) => {
    return async (dispatch) => {
        dispatch(fetchSendLoginRequest());

        try {
            const response = await post(data, '/auth/login');
            console.log("response", response.data.data);

            if(response?.data?.status != false) {
                dispatch(fetchSendLoginSuccess(response.data))
                const role = btoa(response.data.data.user.roles[0].name);

                localStorage.setItem("userId", response.data.data.user.id);
                localStorage.setItem("first_name", response.data.data.user.first_name);
                localStorage.setItem("last_name", response.data.data.user.last_name);
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("email", response.data.data.user.email);
                localStorage.setItem("PosID", response.data.data.user.deal_pos_id);
                localStorage.setItem("role", role);
                localStorage.setItem("LoginStatus", true);
            }
            else {
                dispatch(fetchSendLoginFailure(response.data.message));
                ModalPopUp(response.data.message, "error");
            }

            return response;
        }
        catch(error) {
            dispatch(fetchSendLoginFailure(error))
            console.error(error);
        }
    }
}