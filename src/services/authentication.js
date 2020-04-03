import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST || 'localhost'
const API_URL = `http://${API_HOST}/api`
const TOKEN_TIMEOUT = process.env.REACT_APP_TOKEN_TIMEOUT || 12 * 60 * 60 * 1000 // 12 hours (43200 secs)

export const auth = {
    get,
    post,
    login,
    logout,
    signup
}

function get(link) {
    return axios.get(`${API_URL}${link}`, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

function post(link, data) {
    return axios.get(`${API_URL}${link}`, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } }, data)
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

function login(data) {
    return axios.post(`${API_URL}/auth`, { email: data.email, password: data.password })
        .then(response => {
            localStorage.setItem('x-access-token', response.data.token);
            localStorage.setItem('x-access-token-expiration', Date.now() + TOKEN_TIMEOUT);
            return response.data
        })
        .catch(err => Promise.reject(err.response.status));
}

function logout() {
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-access-token-expiration')
}

function signup(data) {
    return axios.post(`${API_URL}/users`, { email: data.email, password: data.password })
        .then(response => login(data))
        .catch(err => Promise.reject(err.response.status));
}

export function isAuthenticated() {
    return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}