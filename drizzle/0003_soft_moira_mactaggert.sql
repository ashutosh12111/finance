CREATE TABLE IF NOT EXISTS "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"paid_id" text DEFAULT '',
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
