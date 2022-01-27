import { getValue } from "./sensors";
import { setValue } from "./devices";

const checkCondition = (
  sensor: SensorName,
  condition: Condition,
  value: number
) => {
  const sensorValue = getValue(sensor)[1];

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

    default:
      return null;
  }
};

export const initRules = () => {
  let rules: Rule[] = [];
  let activeRules: { [key: Rule["id"]]: Rule["action"] } = [];

  let timer: null | number = null;

  const runRule = (rule: Rule) => {
    const alreadyRunning = activeRules[rule.id] === rule.action;

    if (alreadyRunning) return;

    const runAction = checkCondition(rule.sensor, rule.condition, rule.value);

    if (runAction) {
      activeRules[rule.id] = rule.action;

      setValue(rule.device, rule.action);
    }
  };

  const reloadRules = () => {
    clearInterval(timer);
    timer = null;

    rules = require("../static/rules.json");
    rules.forEach(runRule);
  };

  const loopRules = () => {
    timer = setInterval(
      () => rules.forEach(runRule),
      2000
    ) as unknown as number;
  };

  return {
    runRule,
    reloadRules,
    loopRules,
  };
};
