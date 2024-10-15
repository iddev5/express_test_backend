import { int, mysqlTable, serial, char, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
  hash: char({ length: 64 }).notNull(),
  salt: char({ length: 32 }).notNull(),
  email: varchar({ length: 50 }).unique(),
});
