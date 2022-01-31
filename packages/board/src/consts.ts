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

export const wifiRoutes = {
  WIFI_CONNECTED: "/config/wifi/",
  WIFI_SCAN: "/config/wifi/scan/",
  WIFI_CONNECT: "/config/wifi/connect/",
};

export const configRoutes = {
  ...wifiRoutes,
};

export const rulesRoutes = {
  RULES_ADD: "/rules/add/",
  RULES_EDIT: "/rules/edit/",
  RULES_DELETE: "/rules/delete/",
};

const getRoutes = (prefix: string, obj: Object) =>
  Object.keys(obj).map((objKey) => prefix + objKey + "/");

export const routes = {
  IP: "/get-ip/",
  CONFIG: "/config/",
  SENSORS: "/sensors/",
  DEVICES: "/devices/",
  RULES: "/rules/",
  ...configRoutes,
  ...rulesRoutes,
};

export const sensorRoutes = getRoutes(routes.SENSORS, Sensors);
export const devicesRoutes = getRoutes(routes.DEVICES, Devices);

export const availableRoutes = [
  ...Object.values(routes),
  ...sensorRoutes,
  ...devicesRoutes,
];
