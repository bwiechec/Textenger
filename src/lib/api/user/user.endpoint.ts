import axios from "axios";
import { IApiUser } from "./user.interface";
const base_url = import.meta.env.VITE_BASE_URL;

export function apiGetUsers() {
  return axios<IApiUser[]>({ url: `${base_url}/users.json` });
}

export function apiGetUserById(userId: number | string) {
  return axios<IApiUser>({ url: `${base_url}/users/${userId}.json` });
}
