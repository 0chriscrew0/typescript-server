import type { Request, Response } from "express";
import { BadRequestError } from "./errors.js";

export async function handlerValidateChirp(req: Request, res: Response) {
  const profane = ["kerfuffle", "sharbert", "fornax"];

  const parsedBody = req.body;
  if (parsedBody.body.length > 140) {
    throw new BadRequestError("Chirp is too long. Max length is 140");
  }
  let words = parsedBody.body.split(" ");
  for (let i in words) {
    if (profane.includes(words[i].toLowerCase())) {
      words[i] = "****";
    }
  }
  const cleanBody = words.join(" ");
  console.log(cleanBody);
  res.status(200).send({ cleanedBody: cleanBody });
}
