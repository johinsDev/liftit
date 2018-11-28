import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const setAuthorization =  () => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
      'token'
  )}`;
};

const apiSuffix = '/api/v1';

const get = async (serviceUrl, params) => {
    setAuthorization();
    const url = `${apiUrl}${apiSuffix}${serviceUrl}`;
    const response = !params 
        ? await axios.get(url)
        : await axios.get(url, params);
    return response;
};

const post = async (serviceUrl, params) => {
    setAuthorization();
    const url = `${apiUrl}${apiSuffix}${serviceUrl}`;
    return axios.post(url, params);
};

const put = async (serviceUrl, params) => {
    setAuthorization();
    const url = `${apiUrl}${apiSuffix}${serviceUrl}`;
    const response = await axios.put(url, params);
    return response;
};

const patch = async (serviceUrl, params) => {
    setAuthorization();
    const url = `${apiUrl}${apiSuffix}${serviceUrl}`;
    const response = await axios.patch(url, params);
    return response;
};

const del = async (serviceUrl) => {
    setAuthorization();
    const url = `${apiUrl}${apiSuffix}${serviceUrl}`;
    const response = await axios.delete(url);
    return response;
};

const all = async (promises) => {
    const response = await axios.all([...promises]);
    return response;
};

export {
    get, post, put, patch, del, all
};