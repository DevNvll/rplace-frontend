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
      localStorage.setItem("refresh_token", body.data.refresh_token);
      localStorage.setItem(
        "profile",
        JSON.stringify({ username: body.data.username, admin: body.data.ia })
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

export function refreshToken() {
  axios({
    method: "POST",
    url: `${AUTH_URL}/refresh`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("refresh_token")}`
    }
  }).then(({ data }) => {
    setToken(data.access_token);
  });
}

export function setToken(token) {
  localStorage.setItem("auth_token", token);
}

export function checkAuth() {
  let authToken = localStorage.getItem("auth_token");
  let userProfile = localStorage.getItem("profile");
  return (
    authToken &&
    userProfile &&
    parseJwt(authToken).exp * 1000 > new Date().getTime()
  );
}

export function checkToken() {
  if (getToken()) return parseJwt(getToken()).exp * 1000 > new Date().getTime();
  else return false;
}

export function getToken() {
  return localStorage.getItem("auth_token");
}

export function getProfile() {
  return JSON.parse(localStorage.getItem("profile"));
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("profile");
}
