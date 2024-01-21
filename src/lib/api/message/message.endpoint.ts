import axios from "axios";
import { IApiMessage } from "./message.interface";
const base_url = import.meta.env.VITE_BASE_URL;

export function apiGetMessages() {
  return axios<IApiMessage[]>({ url: `${base_url}/messages.json` });
}

export function apiGetMessagesByThreadId(threadId: number | string) {
  return axios<IApiMessage[]>({
    url: `${base_url}/messages/${threadId}.json?orderBy="timestamp"&orderBy="desc"`,
  });
}
