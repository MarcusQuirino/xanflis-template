import { createTable } from "@/server/db/create-table";
import { relations } from "drizzle-orm";
import { int, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import users from "./users";

export const posts = createTable("post", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export default posts;

export const selectPostSchema = createSelectSchema(posts);
export const insertPostSchema = createInsertSchema(posts).pick({
  content: true,
  userId: true,
});

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
