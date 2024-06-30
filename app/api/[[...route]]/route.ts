import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import accounts from "./accounts"

export const runtime = "edge";

const app = new Hono().basePath("/api");

// app.route("/accounts", accounts)
const route = app.route("/accounts", accounts)


// app.get("/hello", clerkMiddleware(), (c) => {
//   const auth = getAuth(c);
//   if (!auth?.userId) {
//     return c.json({
//       error: "UnAuhtrized",
//     });
//   }

//   return c.json({
//     message: "Hello Next.js!",
//     userId: auth.userId,
//   });
// });

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof route
