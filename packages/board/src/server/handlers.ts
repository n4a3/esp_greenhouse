import { IRoute } from "../types/index";
import { configHandlers } from "./config";
import { rulesHandlers } from "./rules";
import { sensorsHandlers } from "./sensors";

export const route: IRoute = (path, action, req) => {
  const requestedUrl = req.url === path;

  if (!requestedUrl) return;

  return action();
};

export const handlers = [
  ...configHandlers,
  ...sensorsHandlers,
  ...rulesHandlers,
];
