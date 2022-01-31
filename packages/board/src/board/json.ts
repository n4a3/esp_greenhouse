import { readFileSync, writeFileSync } from "fs";

const file = (fileName: string) => `static/${fileName}.json`;

export const readJSON = <T>(fileName: string): T =>
  JSON.parse(readFileSync(file(fileName), { encoding: "utf8" }));

export const writeToJSON = (fileName: string, data: any) => {
  let json: string;

  try {
    json = JSON.stringify(data);
  } catch (e) {
    console.log(e);
    return;
  }

  writeFileSync(file(fileName), json);
};
