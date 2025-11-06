import type { Request, Response } from "express";

export async function handlerValidateChirp(req: Request, res: Response) {
  try {
    const parsedBody = req.body;
    if (parsedBody.body.length > 140) {
      res.status(400).send({ error: "Chirp is too long" });
      return;
    }
    res.status(200).send({ valid: true });
  } catch (err) {
    res.status(400).send({ error: "Something went wrong" });
  }
}
