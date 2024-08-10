CREATE TABLE IF NOT EXISTS "asapok_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"content" jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "asapok_post" ("name");