import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";

export async function findUserByClerkId(clerkId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });
  return user;
}

export async function getUser(clerkId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(clerkId);
  return user;
}
