import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const sql = neon("postgresql://finance_owner:iMIdyR1qeoU0@ep-patient-cell-a5q5gvjg.us-east-2.aws.neon.tech/finance?sslmode=require");
export const db = drizzle(sql);

