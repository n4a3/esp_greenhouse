import { Devices } from "../consts";
import { DeviceName } from "../types/index";

const TIMEOUT = 2000;

let queue: [name: DeviceName, value: number][] = [];

const analogWriteProxy = (device: DeviceName, value: number, options: any) => {
  // analogWrite(Devices[device], value, options);
  console.log(`[Device] ${device} setted to ${value}`);
};

export const setValue = (name: DeviceName, value: number) => {
  queue.push([name, value]);
};

/**
 * Queue to prevent electrical overload
 */
export const loopQueue = () =>
  setInterval(() => {
    queue.forEach(([name, value], i) => {
      const timer = setTimeout(() => {
        analogWriteProxy(name, value, {});
        clearTimeout(timer);
      }, i * TIMEOUT);
    });
    queue = [];
  }, 5000);
