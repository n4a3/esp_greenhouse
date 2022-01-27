import { initRules } from "./rules";
// import { reloadWifi } from "./wifi";

const rules = initRules();

export const initBoard = () => {
  rules.reloadRules();
  rules.loopRules();

  // reloadWifi();
};
