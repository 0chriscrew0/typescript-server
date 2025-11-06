import type { Request, Response } from "express";

export async function handlerValidateChirp(req: Request, res: Response) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      if (parsedBody.body.length > 140) {
        res.status(400).send({ error: "Chirp is too long" });
      }
      res.status(200).send({ valid: true });
    } catch (err) {
      res.status(400).send({ error: "Something went wrong" });
    }
  });
}
