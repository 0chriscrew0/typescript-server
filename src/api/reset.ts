import type { Request, Response } from "express";
import { config } from "../config.js";
import { resetUsers } from "../db/queries/users.js";

export async function handlerReset(_: Request, res: Response) {
  config.api.fileServerHits = 0;
  await resetUsers();
  res.write("Hits reset to 0");
  res.end();
}
