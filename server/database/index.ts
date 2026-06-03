import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../../shared/env";
import * as auth from "./schema/auth";
import * as tiket from "./schema/tiket";

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
  schema: {
    ...auth,
    ...tiket,
  },
  casing: "snake_case",
});
