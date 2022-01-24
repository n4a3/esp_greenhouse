import { routes, Sensors } from "../consts";
import { getAllValues, getValue } from "../board/sensors";

const route: IRoute = (path, action, req) => {
  const requestedUrl = req.url === "/" + path;

  if (!requestedUrl) return;

  return action();
};

const getAll: URoute = (req, resAction) => {
  const action = () => {
    const sensorsState = getAllValues().map(([name, value]) => {
      const url = `http://${req.headers.host}/sensors/${name}/`;

      return {
        url,
        name,
        value,
      };
    });

    resAction(sensorsState);
  };

  route(routes.SENSORS, action, req);
};

const getBySensor: URoute[] = Object.keys(Sensors).map(
  (name: string) => (req, resAction) => {
    const action = () => {
      const url = `http://${req.headers.host}/sensors/${name}/`;

      const sensorState = {
        url,
        name,
        value: getValue(name as SensorName)[1],
      };

      resAction(sensorState);
    };

    route(`${routes.SENSORS}/${name}/`, action, req);
  }
);

export const handlers = {
  get: [getAll].concat(getBySensor), // Espruino can't handle rest operator or Array.prototype.call
  set: [0],
};
