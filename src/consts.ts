export const Sensors = {
  TEMPERATURE: "D0",
  GLOBAL_HUMIDITY: "D0",
  SOIL_HUMIDITY: "D0",
};

export const routes = {
  SENSORS: "/sensors/",
};

export const sensorRoutes = Object.keys(Sensors).map(
  (sensor) => `${routes.SENSORS}${sensor}/`
);

export const availableRoutes = Object.values(routes).concat(sensorRoutes);
