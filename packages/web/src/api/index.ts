import * as ApiTypes from "espg-board/src/types/api";
import { routes } from "espg-board/src/consts";

const request = async <T extends keyof typeof routes>(
  name: T,
  options?: ApiTypes.ApiParams<T>
): Promise<ApiTypes.ApiResponse<T> | null> => {
  const host = localStorage.getItem("ip");

  try {
    return await (await fetch(`http://${host}:3241${routes[name]}`)).json();
  } catch (e) {
    console.error(e);

    return null;
  }
};

export const getWifis = () => request("WIFI_SCAN");

export const setWifi = (options: ApiTypes.ApiParams<"WIFI_CONNECT">) =>
  request("WIFI_CONNECT", options);
