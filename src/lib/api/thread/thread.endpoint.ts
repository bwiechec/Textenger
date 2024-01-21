import axios from "axios";
import { IApiThread } from "./thread.interface";
const base_url = import.meta.env.VITE_BASE_URL;

export function apiGetThreads() {
  return axios<IApiThread[]>({ url: `${base_url}/threads.json` });
}

export function apiGetThreadById(threadId: number | string) {
  return axios<IApiThread>({ url: `${base_url}/threads/${threadId}.json` });
}
