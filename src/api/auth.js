import Router from "express";
import crypto from "crypto";
import { StatusCodes as status } from "http-status-codes";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";

const router = Router();

function authorize(req, res, next) {
  if (req.session.user) next();
  else res.sendStatus(403);
}

router.post("/signin", async (req, res) => {
  if (!req.body) return res.sendStatus(404);

  const { username, password, email } = req.body;
  if (!username || !password) return res.sendStatus(500);

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, username));
  if (user.length >= 1) return res.json({ err: 0, msg: "user already exists" });

  const salt = String(crypto.randomBytes(32));
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512");

  await db.insert(usersTable).values({
    name: username,
    hash: String(hash),
    salt: salt,
    email: email,
  });

  res.sendStatus(200);
});

router.post("/login", async (req, res) => {
  if (!req.body) return res.sendStatus(404);

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) return res.sendStatus(500);

  const user = (
    await db.select().from(usersTable).where(eq(usersTable.name, username))
  )[0];
  if (user === undefined) return res.sendStatus(404);

  const this_hash = crypto.pbkdf2Sync(password, user.salt, 10000, 64, "sha512");

  if (user.hash !== String(this_hash)) return res.sendStatus(status.FORBIDDEN);

  req.session.regenerate((err) => {
    if (err) return res.sendStatus(500);
    req.session.user = user;

    res.sendStatus(status.OK);
  });
});

export { router, authorize };
