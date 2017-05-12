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
  const { data } = await api.get("/users/" + username);
  return data;
}

export async function getUserHistory(username) {
  let { data } = await api.get("/history/users/" + username);
  return data;
}

export function placeBlock(x, y, color) {
  return api.post("/block", {
    x: x,
    y: y,
    color: color
  });
}

export async function getBlock(x, y) {
  let { data } = await api.get("/block", {
    x: x,
    y: y
  });
  return data;
}

export async function getBoard() {
  let { data } = await api.get("/board");
  return data;
}

export async function getBlockHistory(x, y, start, limit) {
  let { data } = await api.get("/history/block", {
    x: x,
    y: y,
    start: start,
    limit: limit
  });
  return data;
}

export async function getLeaderboard(section) {
  let { data } = await api.get("/leaderboards/" + section);
  return data;
}
