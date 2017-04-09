import axios from 'axios'

let api = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export function login(email, password, onLogin, onError) {
  api.post('/login', {email: email, password: password})
  .then((body) => {
    localStorage.setItem('auth_token', body.data.access_token)
    localStorage.setItem('profile', JSON.stringify({'username': email.split('@')[0], 'email': email}))
    onLogin({'username': email.split('@')[0], 'email': email})
  }).catch((err) => {
    onError(err)
  })
}

export function checkAuth() {
  let authToken = localStorage.getItem('auth_token')
  let userProfile = localStorage.getItem('profile')
  return authToken && userProfile ? true : false;
}

export function getToken() {
  return localStorage.getItem('auth_token')
}

export function getProfile() {
  return JSON.parse(localStorage.getItem('profile'))
}

export function logout() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('profile')
}