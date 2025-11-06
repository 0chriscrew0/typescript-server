import type { Request, Response } from "express";

export async function handlerValidateChirp(req: Request, res: Response) {
  const profane = ["kerfuffle", "sharbert", "fornax"];
  try {
    const parsedBody = req.body;
    if (parsedBody.body.length > 140) {
      res.status(400).send({ error: "Chirp is too long" });
      return;
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
  } catch (err) {
    res.status(400).send({ error: "Something went wrong" });
  }
}
