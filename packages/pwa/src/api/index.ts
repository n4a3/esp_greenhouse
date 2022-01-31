import * as ApiTypes from "esp_greenhouse/src/types/api";
import { routes } from "esp_greenhouse/src/consts";

const request = async <T extends keyof typeof routes>(
  name: T
): Promise<ApiTypes.ApiResponse<T>> => {
  const host = localStorage.getItem("ip");
  const res = await (await fetch(`http://${host}:3241${routes[name]}`)).json();

  return res;
};

export const getWifis = () => request("WIFI_SCAN");

export const setWifi = () => request("WIFI_CONNECT");
