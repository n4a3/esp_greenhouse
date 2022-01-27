export const Sensors = {
  TEMPERATURE: "D0",
  GLOBAL_HUMIDITY: "D0",
  SOIL_HUMIDITY: "D0",
};

export const Devices = {
  COOLER: "D0",
  PUMP: "D0",
  LIGHT: "D0",
};

export const routes = {
  CONFIG: "/config/",
  SENSORS: "/sensors/",
  DEVICES: "/devices/",
};

const getRoutes = (prefix: string, obj: Object) =>
  Object.keys(obj).map((objKey) => prefix + objKey + "/");

export const sensorRoutes = getRoutes(routes.SENSORS, Sensors);
export const devicesRoutes = getRoutes(routes.DEVICES, Devices);

export const availableRoutes = [
  ...Object.values(routes),
  ...sensorRoutes,
  ...devicesRoutes,
];
