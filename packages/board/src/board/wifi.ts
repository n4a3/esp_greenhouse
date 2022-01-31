import wifi from "Wifi";
import { AuthMode, Config } from "../types/index";
import { readJSON } from "./json";

const wifiPrefix = "[WiFi]";
const apPrefix = `${wifiPrefix} [AP]`;
const stationPrefix = `${wifiPrefix} [Station]`;

const startAP = (ap: Config["wifi"]["ap"]) => {
  let ssid = ap.ssid;
  let options = ap;

  if (!ssid) {
    ssid = "ESP_GH_NETWORK";

    options.password = "ESP_GH_12345678";
    options.authMode = AuthMode.WPA_WPA2;
    options.channel = 3;
    options.hidden = 0;

    console.log(apPrefix, "Not found ssid in config");
    console.log(apPrefix, "Starting AP with default config");
  }

  wifi.startAP(ssid, options, (e: any) => {
    if (e) {
      console.log(apPrefix, "Error while starting AP: \n", e);
    } else {
      console.log(
        apPrefix,
        `${ssid} started with ${options.password} password!`
      );
    }
  });
};

const connect = (station: Config["wifi"]["station"]) => {
  const ssid = station.ssid;

  wifi.connect(ssid, station, (e: any) => {
    if (e) {
      console.log(stationPrefix, "Can't connect to", ssid, e);
    } else {
      console.log(stationPrefix, "Connected to", ssid);
    }
  });
};

const startWifi = () => {
  const config: Config = readJSON("config");

  if (!config.wifi.station.ssid) {
    console.log(
      wifiPrefix,
      "Not found config.wifi.station.ssid, starting AP..."
    );
    startAP(config.wifi.ap);
  } else {
    connect(config.wifi.station);
  }
};

export const reloadWifi = () => {
  // wifi.disconnect();
  // wifi.stopAP();

  startWifi();
};
