import { get, post } from "../../Services/API/apiHelper";

export const FETCH_PROVINCE_REQUEST = 'FETCH_PROVICE_REQUEST';
export const FETCH_PROVINCE_SUCCESS = 'FETCH_PROVICE_SUCCESS';
export const FETCH_PROVINCE_FAILED = 'FETCH_PROVINCE_FAILED';

export const FETCH_CITY_REQUEST = 'FETCH_CITY_REQUEST';
export const FETCH_CITY_SUCCESS = 'FETCH_CITY_SUCCESS';
export const FETCH_CITY_FAILED = 'FETCH_CITY_FAILED';

export const FETCH_VILLAGE_REQUEST = 'FETCH_VILLAGE_REQUEST';
export const FETCH_VILLAGE_SUCCESS = 'FETCH_VILLAGE_SUCCESS';
export const FETCH_VILLAGE_FAILED = 'FETCH_VILLAGE_FAILED';

export const FETCH_DISTRICT_REQUEST = 'FETCH_DISTRICT_REQUEST';
export const FETCH_DISTRICT_SUCCESS = 'FETCH_DISTRICT_SUCCESS';
export const FETCH_DISTRICT_FAILED = 'FETCH_DISTRICT_FAILED';

export const fetchProviceRequest = () => {
    return {
        type: FETCH_PROVINCE_REQUEST,
    }
}

export const fetchProvinceSuccess = (data) => {
    return {
        type: FETCH_PROVINCE_SUCCESS,
        payload: data,
    }
}

export const fetchProvinceFailed = (error) => {
    return {
        type: FETCH_PROVINCE_FAILED,
        payload: error,
    }
}

export const fetchProvince = () => {
    return async(dispatch) => {
        dispatch(fetchProviceRequest());

        const url = "/global/province";
        const response = await get({}, url);

        if(response.data.status == true) {
            dispatch(fetchProvinceSuccess(response.data.data));
            return response;
        }
        else {
            dispatch(fetchProvinceFailed(response.data.messages));
            return response;
        }
    }
}

export const fetchCityRequest = () => {
    return {
        type: FETCH_CITY_REQUEST,
    }
}

export const fetchCitySuccess = (data) => {
    return {
        type: FETCH_CITY_SUCCESS,
        payload: data,
    }
}

export const fetchCityFailed = (error) => {
    return {
        type: FETCH_CITY_FAILED,
        payload:error,
    }
}


export const fetchCity = (id) => {
    return async(dispatch) => {
        dispatch(fetchCityRequest());

        const data = {
            province_id: id,
        }

        const url = "/global/city/";
        const response = await post(data, url);
        if(response.data.status == true) {
            dispatch(fetchCitySuccess(response.data.data));
            return response;
        }
        else {
            dispatch(fetchCityFailed(response.data.messages));
            return response;
        }
    }
}


export const fetchVillageRequest = () => {
    return {
        type: FETCH_VILLAGE_REQUEST,
    }
}

export const fetchVillageSuccess = (data) => {
    return {
        type: FETCH_VILLAGE_SUCCESS,
        payload: data,
    }
}

export const fetchVillageFailed = (error) => {
    return {
        type: FETCH_VILLAGE_FAILED,
        payload:error,
    }
}


export const fetchVillage = (id) => {
    return async(dispatch) => {
        dispatch(fetchVillageRequest());

        const data = {
            district_id: id,
        }

        const url = "/global/village/";
        const response = await post(data, url);
        console.log("village", response);


        if(response.data.status == true) {
            dispatch(fetchVillageSuccess(response.data.data));
            return response;
        }
        else {
            dispatch(fetchVillageFailed(response.data.messages));
            return response;
        }
    }
}


export const fetchDistrictRequest = () => {
    return {
        type: FETCH_DISTRICT_REQUEST,
    }
}

export const fetchDistrictSuccess = (data) => {
    return {
        type: FETCH_DISTRICT_SUCCESS,
        payload: data,
    }
}

export const fetchDistrictFailed = (error) => {
    return {
        type: FETCH_DISTRICT_FAILED,
        payload:error,
    }
}


export const fetchDistrict = (id) => {
    return async(dispatch) => {
        dispatch(fetchDistrictRequest());

        const data = {
            city_id: id,
        }

        const url = "/global/district/";
        const response = await post(data, url);

        if(response.data.status == true) {
            dispatch(fetchDistrictSuccess(response.data.data));
            return response;
        }
        else {
            dispatch(fetchDistrictFailed(response.data.messages));
            return response;
        }
    }
}


