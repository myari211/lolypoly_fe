import { get, post } from "../../Services/API/apiHelper";

export const FETCH_USER_INFORMATION_REQUEST = 'FETCH_USER_INFORMATION_REQUEST';
export const FETCH_USER_INFORMATION_SUCCESS = 'FETCH_USER_INFORMATION_SUCCESS';
export const FETCH_USER_INFORMATION_FAILURE = 'FETCH_USER_INFORMATION_FAILURE';

export const fetchUserInformationRequest = () => {
    return {
        type: FETCH_USER_INFORMATION_REQUEST,
    }
}

export const fetchUserInformationSuccess = (data) => {
    return {
        type: FETCH_USER_INFORMATION_SUCCESS,
        payload: data,
    }
}

export const fetchUserInformationFailure = (error) => {
    return {
        type: FETCH_USER_INFORMATION_FAILURE,
        payload: error,
    }
}

export const fetchUserInformation = (id) => {
    return async(dispatch) => {
        dispatch(fetchUserInformationRequest());

        try {
            const url = "/user/profile/personal_information/" + id;
            const response = await get({}, url)

            if(response.data.status == true) {
                dispatch(fetchUserInformationSuccess(response.data.data));
                return response;
            }
            else {
                dispatch(fetchUserInformationFailure(response));
                console.error("Action", response);
            }
        }
        catch(error) {
            dispatch(fetchUserInformationFailure(error));
            console.error(error);
        }
    }
} 