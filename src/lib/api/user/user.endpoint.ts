import axios from "axios";
import { IApiUser } from "./user.interface";
const base_url = import.meta.env.VITE_BASE_URL;

export function apiGetUsers() {
  return axios<IApiUser[]>({ url: `${base_url}/users.json` });
}

export function apiGetUserById(userId: number | string) {
  return axios<IApiUser>({ url: `${base_url}/users/${userId}.json` });
}

export function apiChangeUserById(userId: number | string, user: IApiUser) {
  return axios<IApiUser>({
    url: `${base_url}/users/${userId}.json`,
    method: "PATCH",
    data: JSON.stringify(user),
  });
}

export function apiAddUserThread(
  userId: number | string,
  thread: { [id: number | string]: { value: boolean } }
) {
  return axios<IApiUser>({
    url: `${base_url}/users/${userId}/threads.json`,
    method: "PATCH",
    data: JSON.stringify(thread),
  });
}

export function apiDeleteUserThread(
  userId: number | string,
  threadId: number | string
) {
  return axios<IApiUser>({
    url: `${base_url}/users/${userId}/threads/${threadId}.json`,
    method: "DELETE",
  });
}
