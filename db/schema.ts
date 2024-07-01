import { pgTable, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("paid_id").default(""),
    name: text("name").notNull(),
    userId: text("user_id").notNull()
});

export const insertAccountsSchema = createInsertSchema(accounts);
export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    plaidId: text("paid_id").default(""),
    name: text("name").notNull(),
    userId: text("user_id").notNull()
});
export const insertcategoriesSchema = createInsertSchema(categories);
