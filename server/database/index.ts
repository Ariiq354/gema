import { drizzle } from "drizzle-orm/postgres-js";
import { EnhancedQueryLogger } from "drizzle-query-logger";
import { env } from "../../shared/env";
import * as auth from "./schema/auth";
import * as tiket from "./schema/tiket";

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
  schema: {
    ...auth,
    ...tiket,
  },
  casing: "snake_case",
  logger: new EnhancedQueryLogger(),
});
