declare module Wifi {
  function connect(
    ssid: string,
    options: import("./types/index").WifiConnectOptions,
    callback: (err: any) => any
  ): void;

  function startAP(
    ssid: string,
    options: import("./types/index").WifiAPOptions,
    callback: (err: any) => any
  ): void;

  function getStatus(
    cb?: <T>(status: import("./types/index").WifiStatus) => T
  ): import("./types/index").WifiStatus;
}

declare function pinMode(
  pin: Pin,
  mode: import("./types/index").PinMode,
  automatic: boolean
): void;
