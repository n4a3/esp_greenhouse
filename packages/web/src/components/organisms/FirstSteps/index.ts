import Step1 from "./1";
import Step2 from "./2";
import Step3 from "./3";
import Step4 from "./4";
import LastStep from "./LastStep";

export const steps = [
  { name: "1. Connect device to ESP WiFi", Step: Step1 },
  { name: "2. Connect app to ESP", Step: Step2 },
  { name: "3. Configure WiFi", Step: Step3 },
  { name: "4. Reconnect device to home WiFi", Step: Step4 },
  { name: "5. Connect app to ESP again", Step: Step2 },
  { name: "6. Done", Step: LastStep },
];
