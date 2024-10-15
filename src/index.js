import express from "express";
import session from "express-session";
import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";
import { router as auth, authorize } from "./api/auth.js";
import db from "./db/index.js";
import { usersTable } from "./db/schema.js";
import { eq } from "drizzle-orm";

const port = 8080;
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(64);

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(
  "/static",
  express.static(path.join(import.meta.dirname, "./package.json"))
);

app.get("/test", (req, res) => {
  res.json({ code: 1, msg: "Hello World" });
});

app.get("/restricted", authorize, (req, res) => {
  res.send("Congrats, you can access it");
});

app.get("/who-am-i", authorize, async (req, res) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.session.user.id));
  res.json({ "you are": user[0].name });
});

app.use("/auth", auth);

app.listen(port, () => console.log("App is running"));
