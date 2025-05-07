import axios from 'axios';

const createConnection = (baseURLParam, isMultipart = false) => {
    const rootURL = process.env.REACT_APP_BASE_URL;
    const url = rootURL + baseURLParam;
  
    const headers = {};
    if (isMultipart) {
      // Biarkan browser yang otomatis set Content-Type dengan boundary
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
  
    const apiClient = axios.create({
      baseURL: url,
      headers,
      timeout: 10000,
    });
  
    apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    });
  
    apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error: ', error);
        return Promise.reject(error);
      }
    );
  
    return apiClient;
  };

export const get = (params, baseURL) => {
    const apiClient = createConnection(baseURL);
    return apiClient.get('', {params});
}

export const post = (params, baseURL, isMultipart = false) => {
    const apiClient = createConnection(baseURL, isMultipart);
    return apiClient.post('', params);
};

export const getImg = (params) => {
    return process.env.REACT_APP_BASE_IMAGE + "/" + params;
}