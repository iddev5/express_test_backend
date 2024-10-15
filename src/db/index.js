import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/connect";
import { usersTable } from "./schema.js";
import mysql from "mysql2/promise";

dotenv.config();

async function init_db() {
  const db = await drizzle("mysql2", process.env.DATABASE_URL); //'mysql://localhost:3306/express_test?user=dev&password=dev2004')
  return db;
}

export default await init_db();
