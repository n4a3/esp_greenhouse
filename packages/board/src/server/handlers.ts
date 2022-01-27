import { sensors } from "./sensors";

export const route: IRoute = (path, action, req) => {
  const requestedUrl = req.url === "/" + path;

  if (!requestedUrl) return;

  return action();
};

export const handlers = {
  get: [...sensors.get],
  set: [0],
};
