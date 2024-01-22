import axios from "axios";
import { IApiMessage } from "./message.interface";
const base_url = import.meta.env.VITE_BASE_URL;

export function apiGetMessages() {
  return axios<IApiMessage[]>({ url: `${base_url}/messages.json` });
}

export function apiGetMessagesByThreadId(threadId: number | string) {
  console.log(threadId);
  return axios<IApiMessage[]>({
    url: `${base_url}/messages.json?orderBy="threadId"&equalTo="${threadId}"&orderBy="timestamp"&orderBy="desc"`,
  });
}

export function apiCreateMessages(message: IApiMessage) {
  return axios<IApiMessage[]>({
    url: `${base_url}/messages.json`,
    method: "POST",
    data: JSON.stringify(message),
  });
}
