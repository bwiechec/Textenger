import axios from "axios";
import { IApiThread } from "./thread.interface";
const base_url = import.meta.env.VITE_BASE_URL;

export function apiGetThreads() {
  return axios<IApiThread[]>({ url: `${base_url}/threads.json` });
}

export function apiGetThreadById(threadId: number | string) {
  return axios<IApiThread>({ url: `${base_url}/threads/${threadId}.json` });
}

export function apiCreateThread(thread: IApiThread) {
  return axios<IApiThread>({
    url: `${base_url}/threads.json`,
    method: "POST",
    data: JSON.stringify(thread),
  });
}

export function apiChangeThread(thread: IApiThread, threadId: number | string) {
  return axios<IApiThread>({
    url: `${base_url}/threads/${threadId}.json`,
    method: "PATCH",
    data: JSON.stringify(thread),
  });
}

export function apiDeleteThread(threadId: number | string) {
  return axios<IApiThread>({
    url: `${base_url}/threads/${threadId}.json`,
    method: "DELETE",
  });
}

export function apiDeleteUserFromThread(
  userId: number | string,
  threadId: number | string
) {
  return axios<IApiThread>({
    url: `${base_url}/threads/${threadId}/members/${userId}.json`,
    method: "DELETE",
  });
}
