import { loopQueue } from "./devices";
import { rules } from "./rules";
// import { reloadWifi } from "./wifi";

export const initBoard = () => {
  rules.reloadRules();
  rules.loopRules();

  loopQueue();

  // reloadWifi();
};
