import { AuthMode, Config, Rule } from "./index";
import { routes } from "../consts";

export interface WifiNetwork {
  ssid: string;
  signal: number;
  authMode: AuthMode;
}

type _RuleAddParams<T> = T extends "RULES_ADD" ? Rule : never;

type _WifiConnectParams<T> = T extends "WIFI_CONNECT"
  ? Config["wifi"]["station"]
  : never;

export type ApiParams<T extends keyof typeof routes> =
  | _RuleAddParams<T>
  | _WifiConnectParams<T>;

type _IP<T> = T extends "IP" ? { ip: string } : never;
type _RuleAdd<T> = T extends "RULES_ADD" ? Rule : never;
type _RuleDelete<T> = T extends "RULES_DELETE" ? Rule : never;
type _Rules<T> = T extends "RULES" ? Rule[] : never;
type _Wifi<T> = T extends "WIFI_SCAN" ? WifiNetwork[] : never;
type _WifiConnect<T> = T extends "WIFI_CONNECT" ? { status: string } : never;

export type ApiResponse<T extends keyof typeof routes> =
  | _IP<T>
  | _Wifi<T>
  | _WifiConnect<T>
  | _RuleAdd<T>
  | _RuleDelete<T>
  | _Rules<T>;
