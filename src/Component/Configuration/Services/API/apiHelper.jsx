import axios from 'axios';

const createConnection = (baseURLParam) => {
    const rootURL = process.env.REACT_APP_BASE_URL;
    const url = rootURL + baseURLParam;

    const apiClient = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 10000,
    });

    apiClient.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    })

    apiClient.interceptors.response.use((response) => response, (error) => {console.error('API Error: ', error); return Promise.reject(error)});

    return apiClient;
}

export const get = (params, baseURL) => {
    const apiClient = createConnection(baseURL);
    return apiClient.get('', {params});
}

export const post = (params, baseURL) => {
    const apiClient = createConnection(baseURL);
    return apiClient.post('', params);
}