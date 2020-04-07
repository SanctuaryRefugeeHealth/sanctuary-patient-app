import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST || 'localhost'
const API_URL = `http://${API_HOST}/api`
const TOKEN_TIMEOUT = parseInt(process.env.REACT_APP_TOKEN_TIMEOUT) || 12 * 60 * 60 * 1000 // 12 hours (43200 secs)

export const jwt = {
    get,
    post,
    put,
    patch,
    remove,
    login,
    logout,
    signup
}

const header = _ => {
    const token = localStorage.getItem('x-access-token')
    return { headers: { 'x-access-token': token } }
}

function get(link) {
    return axios.get(`${API_URL}${link}`, header())
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

function post(link, data) {
    return axios.post(`${API_URL}${link}`, data, header())
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

function put(link, data) {
    return axios.put(`${API_URL}${link}`, data, header())
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

function patch(link, data) {
    return axios.patch(`${API_URL}${link}`, data, header())
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

function remove(link, data) {
    return axios.delete(`${API_URL}${link}`, data, header())
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
}

function login(data) {
    const email = data.email
    return axios.post(`${API_URL}/auth`, { email, password: data.password })
        .then(response => {
            localStorage.setItem('x-access-token', response.data.token);
            localStorage.setItem('x-access-token-expiration', Date.now() + TOKEN_TIMEOUT);
            return { ...response.data, state: 'login' }
        })
        .catch(err => Promise.reject(err.response.status));
}

function logout() {
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-access-token-expiration')

    return new Promise(r => r({ state: 'logout' }));
}

function signup(data) {
    return axios.put(`${API_URL}/user`, { email: data.email, password: data.password })
        .then(response => login(data))
        .catch(err => Promise.reject(err.response.status));
}

export function isAuthenticated() {
    const expiration = parseInt(localStorage.getItem('x-access-token-expiration'))
    return localStorage.getItem('x-access-token') && expiration > Date.now()
}