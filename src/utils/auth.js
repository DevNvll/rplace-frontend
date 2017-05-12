import axios from "axios";
import { AUTH_URL } from "../config";

let auth = axios.create({
  baseURL: `${AUTH_URL}`,
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
});

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

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
      if (body.status === 200) {
        localStorage.setItem("auth_token", body.data.access_token);
        localStorage.setItem(
          "profile",
          JSON.stringify({ username: body.data.username })
        );
        if (onRegister) onRegister({ username: body.data.username });
      }
    })
    .catch(err => {
      if (onError) onError(err.response.data.error.status_code);
    });
}

export function checkAuth() {
  let authToken = localStorage.getItem("auth_token");
  let userProfile = localStorage.getItem("profile");
  return (
    authToken && userProfile && parseJwt(authToken).exp < new Date().getTime()
  );
}

export function checkToken() {
  return parseJwt(getToken()).exp < new Date().getTime();
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
