import axios from "axios";
import { API_URL } from "../config";
import { getToken } from "./auth";

let api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${getToken()}`
  }
});

// RPLACE API

export async function getInfo(username) {
  const { data } = await api.get("/user/" + username);
  return data;
}

export function getUserHistory(username) {
  return api.get("/history/user/" + username);
}

export function placeBlock(x, y, color) {
  return api.post("/block", {
    x: x,
    y: y,
    color: color
  });
}

export function getBlock(x, y) {
  return api.get("/block", {
    x: x,
    y: y
  });
}

export function getBoard() {
  return api.get("/board");
}

export function getBlockHistory(x, y, start, limit) {
  return api.get("/history/block", {
    x: x,
    y: y,
    start: start,
    limit: limit
  });
}
