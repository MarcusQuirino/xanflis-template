import { db } from "@/server/db";
import { type insertUserSchema, users } from "@/server/db/schema";
import { z } from "zod";

export async function createUser(data: z.infer<typeof insertUserSchema>) {
  try {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
