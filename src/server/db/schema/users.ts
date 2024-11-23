import { createTable } from "@/server/db/create-table";
import { int, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const users = createTable("user", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  clerkId: text("clerk_id").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export default users;

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users).pick({
  clerkId: true,
});
