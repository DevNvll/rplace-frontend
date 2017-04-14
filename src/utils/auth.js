import axios from "axios";
import { API_URL, AUTH_URL } from "../config";

let auth = axios.create({
  baseURL: `${AUTH_URL}`,
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
});

let api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${getToken()}`
  }
});

//AUTH API

export function login(email, password, captcha, onLogin, onError) {
  auth
    .post("/login", {
      email: email,
      password: password,
      "g-recaptcha-response": captcha
    })
    .then(body => {
      localStorage.setItem("auth_token", body.data.access_token);
      localStorage.setItem(
        "profile",
        JSON.stringify({ username: body.data.username })
      );
      onLogin({ username: body.data.username });
    })
    .catch(err => {
      if (onError) onError(err.response.data.error.status_code);
    });
}

export function register(username, email, password, onRegister, onError) {
  auth
    .post("/register", { username: username, email: email, password: password })
    .then(body => {
      if (body.status === 200) if (onRegister) onRegister();
    })
    .catch(err => {
      if (onError) onError(err.response.data.error.status_code);
    });
}

export async function getInfo(username) {
  const { data } = await api.get("/user/" + username);
  return data;
}

export function checkAuth() {
  let authToken = localStorage.getItem("auth_token");
  let userProfile = localStorage.getItem("profile");
  return authToken && userProfile ? true : false;
}

export function getToken() {
  return localStorage.getItem("auth_token");
}

export function getProfile() {
  return JSON.parse(localStorage.getItem("profile"));
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("profile");
}
