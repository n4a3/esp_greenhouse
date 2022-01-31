import { RequestListener, ServerResponse } from "http";
import { availableRoutes } from "../consts";
import { handlers } from "./handlers";

// remove after testing
import * as http from "http";

const serverPrefix = "[Server]";

const processNotFound: RequestListener = (req, res) => {
  if (!availableRoutes.includes(req.url)) {
    res.writeHead(404);
    res.end();

    console.log("[RES]", res.req.url, 404);
  }

  return;
};

const sendGetRes = (res: ServerResponse, value: any) => {
  res.setHeader("Content-Type", "application/json");

  let answer;
  let status;

  try {
    status = 200;
    answer = JSON.stringify(value);
  } catch (e) {
    status = 500;
    answer = JSON.stringify(e.message);
  }

  res.writeHead(status);
  res.end(answer);

  console.log(serverPrefix, "== GET =>", res.req.url, status);
};

const get: (qp: string) => RequestListener = (qp) => (req, res) => {
  if (req.method !== "GET") return;

  console.log(serverPrefix, "=> GET ==", req.url);

  const parsed = new URLSearchParams(qp);

  const action = (value: any) => sendGetRes(res, value);
  handlers.map((handler) => handler(req, action, parsed));
};

const listener: RequestListener = (req, res) => {
  let [url, qp = ""] = req.url.split("?");

  url = url.at(-1) === "/" ? url : url + "/";
  req.url = url;

  res.setHeader("Access-Control-Allow-Origin", "*");

  get(qp)(req, res);

  processNotFound(req, res);
};

export const createServer = () => {
  console.log(serverPrefix, "Server started!");

  console.log(serverPrefix, "Routes:", availableRoutes);

  return http.createServer(listener).listen(3241);
};
