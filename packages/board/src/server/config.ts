import { readJSON } from "../board/json";
import { routes } from "../consts";
import { AuthMode, Config, URoute } from "../types/index";
import { route } from "./handlers";

const getIP: URoute<"IP"> = (req, resAction) => {
  const action = () => {
    resAction({ ip: "127.0.0.1" });
  };

  route(routes.IP, action, req);
};

const getWifis: URoute<"WIFI_SCAN"> = (req, resAction) => {
  const action = () => {
    resAction([
      {
        ssid: "TEST1",
        signal: -35,
        authMode: AuthMode.OPEN,
      },
      {
        ssid: "TEST2",
        signal: -75,
        authMode: AuthMode.WPA_WPA2,
      },
      {
        ssid: "TEST3",
        signal: -45,
        authMode: AuthMode.WPA,
      },
    ]);
  };

  route(routes.WIFI_SCAN, action, req);
};

const setWifi: URoute<"WIFI_CONNECT"> = (req, resAction, qp) => {
  const action = () => {
    const newWifi: Config["wifi"]["station"] = {
      ssid: qp.ssid,
      password: qp.password,
    };

    const oldConfig: Config = readJSON("config");
    // add wifi.connect and if it's ok => save to json

    resAction({ status: "ok" });
  };

  route(routes.WIFI_CONNECT, action, req);
};

const firstStart: URoute<never> = (req, resAction) => {
  const action = () => {};

  route(routes.CONFIG, action, req);
};

export const configHandlers = [getIP, getWifis, setWifi, firstStart];
