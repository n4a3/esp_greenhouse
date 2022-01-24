import { Sensors } from "../consts";

const analogRead = (q: string) => +new Date();

const analogWrite = (q: string, v: any, o: any) => {};

export const getAllValues = (filterName?: SensorName): [SensorName, number][] =>
  Object.entries(Sensors)
    .filter(([name]) => (!!filterName ? name === filterName : true))
    .map<[SensorName, number]>(([name, pin]) => [
      name as SensorName,
      analogRead(pin),
    ]);

export const getValue = (name: SensorName) => getAllValues(name)[0];

export const setValue = (name: SensorName, value: number) =>
  analogWrite(Sensors[name], value, {});
