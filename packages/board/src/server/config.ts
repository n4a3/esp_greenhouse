import { routes } from "../consts";
import { route } from "./handlers";

const firstStart: URoute = (req, resAction) => {
  const action = () => {};

  route(routes.CONFIG, action, req);
};
