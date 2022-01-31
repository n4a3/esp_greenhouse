import { readJSON, writeToJSON } from "../board/json";
import { rules } from "../board/rules";
import { routes } from "../consts";
import { DeviceName, Rule, SensorName, URoute } from "../types/index";
import { route } from "./handlers";

const getRules: URoute<"RULES"> = (req, resAction) => {
  const action = () => {
    const rules: Rule[] = readJSON("rules");

    resAction(rules);
  };

  route(routes.RULES, action, req);
};

const addRule: URoute<"RULES_ADD"> = (req, resAction, qp) => {
  const action = () => {
    const oldRules: Rule[] = readJSON("rules");

    const newRule = {
      id: oldRules.length,
      sensor: qp.sensor,
      condition: +qp.condition,
      value: qp.sensor === "TIME" ? qp.value : +qp.value,
      device: qp.device,
      action: +qp.action,
    } as Rule;

    oldRules.push(newRule);
    writeToJSON("rules", oldRules);
    rules.reloadRules();

    resAction(newRule);
  };

  route(routes.RULES_ADD, action, req);
};

const deleteRule: URoute<"RULES_DELETE"> = (req, resAction, qp) => {
  const action = () => {
    const p = new URLSearchParams(qp);

    const oldRules: Rule[] = readJSON("rules");

    const idx = oldRules.findIndex((rule) => rule.id === +p.get("id"));
    const newRules = [...oldRules.slice(0, idx), ...oldRules.slice(idx + 1)];

    writeToJSON("rules", newRules);
    rules.reloadRules();

    resAction(oldRules[idx]);
  };

  route(routes.RULES_DELETE, action, req);
};

export const rulesHandlers = [getRules, addRule, deleteRule];
