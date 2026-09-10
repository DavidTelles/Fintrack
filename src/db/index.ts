import { drizzle } from "drizzle-orm/neon-http";

// console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
const connectionString = process.env.DATABASE_URL!;

export const db = drizzle(connectionString);