import store from "storejs";
import { StorageKey } from "@/constants";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "/api";

const inst = axios.create({ baseURL: BASE_URL });

inst.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${store.get(StorageKey.AccessToken)}`;
  return req;
});
inst.interceptors.response.use((res) => {
  return res.data;
});

export default async function request<T = any>(
  url: string,
  opts?: AxiosRequestConfig
) {
  return (await inst(url, opts)) as T;
}
