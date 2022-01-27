declare namespace NodeJS {
  interface Module {
    __non_webpack_require__: Require;
  }
}

declare const enum PinMode {
  AUTO = "auto",
  ANALOG = "analog",
  INPUT = "input",
  INPUT_PULLUP = "input_pullup",
  INPUT_PULLDOWN = "input_pulldown",
  OUTPUT = "output",
  OPENDRAIN = "opendrain",
  OPENDRAIN_PULLUP = "opendrain_pullup",
  AF_OUTPUT = "af_output",
  AF_OPENDRAIN = "af_opendrain",
}

declare const enum AuthMode {
  OPEN = "open",
  WPA = "wpa",
  WPA2 = "wpa2",
  WPA_WPA2 = "wpa_wpa2",
}

declare const enum Condition {
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
}

declare function pinMode(pin: Pin, mode: PinMode, automatic: boolean): void;

declare interface WifiConnectOptions {
  /**
   * Password string to be used to access the network
   */
  password: string;
  /**
   * An array of up to two DNS servers in dotted decimal format string
   */
  dnsServers?: string[];
  /**
   * Wifi channel of the access point (integer, typ 0..14, 0 means any channel), only on ESP8266
   */
  channel?: number;
  /**
   * Mac address of the access point (string, type "00:00:00:00:00:00"), only on ESP8266
   */
  bssid?: string;
}

declare type WifiConnectOptionsWithSSID = WifiConnectOptions & {
  ssid?: string;
};

declare interface WifiAPOptionsBase {
  /**
   * The authentication mode to use. Can be one of {@link AuthMode}
   */
  authMode: AuthMode;
  /**
   * The channel to be used for the access point in the range 1..13. If the device is also connected to an access point as a station then that access point determines the channel
   */
  channel: number;
  /**
   * The flag if visible or not (0:visible, 1:hidden)
   */
  hidden: 0 | 1;
}

declare interface WifiAPOptionsOpen extends WifiAPOptionsBase {
  authMode: AuthMode.OPEN;
  password: "";
}

declare interface WifiAPOptionsWPA extends WifiAPOptionsBase {
  authMode: Exclude<AuthMode, AuthMode.OPEN>;
  password: string;
}

declare type WifiAPOptions = WifiAPOptionsOpen | WifiAPOptionsWPA;

declare type WifiAPOptionsWithSSID = WifiAPOptions & { ssid?: string };

declare type WifiMode = "off" | "sta" | "ap" | "sta+ap";

declare type WifiStationStatus =
  | "off"
  | "connecting"
  | "wrong_password"
  | "no_ap_found"
  | "connect_fail"
  | "connected";

declare interface WifiStatus {
  /**  Status of the wifi station: off, connecting, ... */
  station: WifiStationStatus;
  /**  Status of the wifi access point: disabled, enabled. */
  ap: "disabled" | "enabled";
  /**  The current operation mode: off, sta, ap, sta+ap. */
  mode: WifiMode;
  /**  Modulation standard configured: 11b, 11g, 11n (the esp8266 docs are not very clear, but it is assumed that 11n means b/g/n). This setting limits the modulations that the radio will use, it does not indicate the current modulation used with a specific access point. */
  phy: "11b" | "11g" | "11n";
  /**  Power saving mode: none (radio is on all the time), ps-poll (radio is off between beacons as determined by the access point's DTIM setting). Note that in 'ap' and 'sta+ap' modes the radio is always on, i.e., no power saving is possible. */
  powersave: "none" | "ps-poll";
  /**  The saved operation mode which will be applied at boot time: off, sta, ap, sta+ap. */
  savedMode: WifiMode;
}

declare module Wifi {
  function connect(
    ssid: string,
    options: WifiConnectOptions,
    callback: (err: any) => any
  ): void;

  function startAP(
    ssid: string,
    options: WifiAPOptions,
    callback: (err: any) => any
  ): void;

  function getStatus(cb?: <T>(status: WifiStatus) => T): WifiStatus;
}

declare type SensorName = keyof typeof import("./consts").Sensors;

declare type DeviceName = keyof typeof import("./consts").Devices;
declare enum DeviceAction {
  STOP = 0,
  START = 1,
}

declare interface Rule {
  id: number;
  sensor: SensorName;
  condition: Condition;
  value: number;
  device: DeviceName;
  action: DeviceAction;
}

declare function iRoute<T>(
  path: string,
  action: () => T,
  req: import("http").IncomingMessage
): void;

declare type IRoute = typeof iRoute;

declare interface URouteOptions {
  path?: string;
}

declare function uRoute(
  req: import("http").IncomingMessage,
  action: (value: any) => void
): void;

declare type URoute = typeof uRoute;

declare interface ModuleStatus {
  name: SensorName;
  url: string;
  value: number;
}

declare interface ModuleError {
  name: string;
  error: string;
}

declare type ModuleResponse = ModuleStatus | ModuleError;

declare type Config = typeof import("./static/config.json");
