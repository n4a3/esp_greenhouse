import { getValue } from "./sensors";
import { setValue } from "./devices";
import { readJSON } from "./json";
import { Condition, Rule } from "../types/index";

const rulesPrefix = "[Rules]";

const checkTime = (time: string, condition: Condition) => {
  // remove after testing
  return false;

  const { getHours, getMinutes } = new Date();
  const cT = `${getHours()}:${getMinutes()}`;

  return checkCondition(cT, condition, time);
};

const checkCondition = <T>(sensorValue: T, condition: Condition, value: T) => {
  switch (condition) {
    case Condition["="]:
      return sensorValue === value;

    case Condition["!="]:
      return sensorValue !== value;

    case Condition["<"]:
      return sensorValue < value;

    case Condition["<="]:
      return sensorValue <= value;

    case Condition[">"]:
      return sensorValue > value;

    case Condition[">="]:
      return sensorValue >= value;

    case Condition.none:
      return true;

    default:
      return null;
  }
};

export const saveRules = (rules: Rule[]) => {};

const initRules = () => {
  let rules: Rule[] = [];
  let activeRules: { [key: Rule["id"]]: Rule["action"] } = [];

  let timer: null | number = null;

  const runRule = (rule: Rule) => {
    const alreadyRunning = activeRules[rule.id] === rule.action;

    if (alreadyRunning) return;

    let runAction: boolean;

    if (rule.condition === Condition.none) {
      activeRules[rule.id] = rule.action;
      setValue(rule.device, rule.action);
      return;
    }

    if (rule.sensor === "TIME") {
      runAction = checkTime(rule.value, rule.condition);
    } else {
      const sensorValue = getValue(rule.sensor)[1];
      runAction = checkCondition(sensorValue, rule.condition, rule.value);
    }

    if (runAction) {
      activeRules[rule.id] = rule.action;
      setValue(rule.device, rule.action);
    }
  };

  const reloadRules = () => {
    clearInterval(timer);
    timer = null;

    rules = readJSON("rules");
    rules.forEach(runRule);

    console.log(rulesPrefix, "Rules reloaded!");
  };

  const loopRules = () => {
    timer = setInterval(
      () => rules.forEach(runRule),
      2000
    ) as unknown as number;
  };

  console.log(rulesPrefix, "Rules initialized!");

  return {
    runRule,
    reloadRules,
    loopRules,
  };
};

export const rules = initRules();
