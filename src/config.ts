process.loadEnvFile();

if (!process.env.DB_URL) {
  throw new Error("set dburl env variable");
}

type APIConfig = {
  fileserverHits: number;
  dbURL: string;
};

export const config: APIConfig = {
  fileserverHits: 0,
  dbURL: process.env.DB_URL,
};
