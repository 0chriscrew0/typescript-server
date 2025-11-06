import { BadRequestError } from "../../api/errors.js";
import { db } from "../index.js";
import { NewChirp, chirps } from "../schema.js";
import { eq } from "drizzle-orm";

function validateAndCleanChirp(chirp: NewChirp) {
  const profane = ["kerfuffle", "sharbert", "fornax"];

  if (chirp.body.length > 140) {
    throw new BadRequestError("Chirp is too long. Max length is 140");
  }
  let words = chirp.body.split(" ");
  for (let i in words) {
    if (profane.includes(words[i].toLowerCase())) {
      words[i] = "****";
    }
  }
  const cleanBody = words.join(" ");
  return cleanBody;
}

export async function createChirp(chirp: NewChirp) {
  const newChirp = {
    body: validateAndCleanChirp(chirp),
    userId: chirp.userId,
  };
  const [result] = await db
    .insert(chirps)
    .values(newChirp)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function getChirps() {
  const results = await db.select().from(chirps);
  return results;
}

export async function getChirp(id: string) {
  const [result] = await db.select().from(chirps).where(eq(chirps.id, id));
  return result;
}
