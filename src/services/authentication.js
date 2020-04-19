import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST
const API_URL = `${API_HOST}/api`
const TOKEN_TIMEOUT = parseInt(process.env.REACT_APP_TOKEN_TIMEOUT)

// HTTP error code handler
const on401 = _ => {
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-access-token-expiration')
    return window.location.href = '/login'
}

const handlers = {
    401: on401,
}
const errorHandle = defaultHandle => code => handlers[code] || defaultHandle(code)  // currying
const handle = errorHandle(code => Promise.reject(`Request error (${code})`))  // set default error handler

// HTTP request methods w/ JWT
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
        .then(
            response => response.data,
            rejected => handle(rejected.response.status)
        )
}

function post(link, data) {
    return axios.post(`${API_URL}${link}`, data, header())
        .then(
            response => response.data,
            rejected => handle(rejected.response.status)
        )
}

function put(link, data) {
    return axios.put(`${API_URL}${link}`, data, header())
        .then(
            response => response.data,
            rejected => handle(rejected.response.status)
        )
}

function patch(link, data) {
    return axios.patch(`${API_URL}${link}`, data, header())
        .then(
            response => response.data,
            rejected => handle(rejected.response.status)
        )
}

function remove(link, data) {
    return axios.delete(`${API_URL}${link}`, data, header())
        .then(
            response => response.data,
            rejected => handle(rejected.response.status)
        )
}

function login(data) {
    const email = data.email
    return axios.post(`${API_URL}/auth`, { email, password: data.password })
        .then(
            response => {
                const timeout = Date.now() + TOKEN_TIMEOUT
                localStorage.setItem('x-access-token', response.data.token);
                localStorage.setItem('x-access-token-expiration', timeout);
                return { ...response.data, state: 'login', timeout }
            },
            rejected => handle(rejected.response.status)
        )
}

function logout() {
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-access-token-expiration')
    return new Promise(r => r({ state: 'logout', timeout: 0 }));
}

function signup(data) {
    return axios.put(`${API_URL}/user`, { email: data.email, password: data.password })
        .then(
            _ => login(data),
            rejected => handle(rejected.response.status)
        )
}

export function isAuthenticated() {
    const expiration = parseInt(localStorage.getItem('x-access-token-expiration'))
    return localStorage.getItem('x-access-token') && expiration > Date.now()
}

export function getExpirationTime() {
    const expiration = localStorage.getItem('x-access-token-expiration')
    return expiration ? parseInt(expiration) : 0;
}