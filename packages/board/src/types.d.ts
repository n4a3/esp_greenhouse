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

declare function pinMode(pin: Pin, mode: PinMode, automatic: boolean): void;

declare type SensorName = keyof typeof import("./consts").Sensors;

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
