import { index, int, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { createTable } from "@/server/db/create-table";

const users = createTable(
  "user",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    clerkId: text("clerk_id").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    clerkIdIdx: index("clerk_id_idx").on(table.clerkId),
  }),
);

export default users;

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users).pick({
  clerkId: true,
});
