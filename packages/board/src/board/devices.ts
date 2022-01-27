import { Devices } from "../consts";

const analogWriteProxy = (device: string, value: number, options: any) => {
  // analogWrite(Devices[device], value, options);
  console.log(`[Device] ${device} setted to ${value}`);
};

export const setValue = (name: DeviceName, value: number) =>
  analogWriteProxy(name, value, {});
