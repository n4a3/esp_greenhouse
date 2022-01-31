import { Sensors } from "../consts";
import { SensorName } from "../types/index";

/** Emulation */
const analogReadProxy = (q: string) => {
  const value = Math.random() >= 0.5 ? 30 : 18;
  console.log(value);
  return value;
};

export const getAllValues = (filterName?: SensorName): [SensorName, number][] =>
  Object.entries(Sensors)
    .filter(([name]) => (!!filterName ? name === filterName : true))
    .map<[SensorName, number]>(([name, pin]) => [
      name as SensorName,
      analogReadProxy(pin),
    ]);

export const getValue = (name: SensorName) => getAllValues(name)[0];
