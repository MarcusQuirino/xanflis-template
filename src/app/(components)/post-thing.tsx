import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { findUserByClerkId } from "@/lib/clerk";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function PostThing() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error(
      "Unauthorized - signed out user should not be able to post",
    );
  }

  const user = await findUserByClerkId(userId);
  if (!user) {
    throw new Error("Not found - user has a clerk id but is not in db");
  }

  const postList = await db.query.posts.findMany({
    with: {
      user: true,
    },
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 sm:px-0">
      <form
        action={async (formData: FormData) => {
          "use server";

          const post = formData.get("post") as string;
          if (!post) return;

          await db.insert(posts).values({
            content: post,
            userId: user.id,
          });

          revalidatePath("/");
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <Input
          id="post"
          name="post"
          placeholder="What's happening?"
          className="flex-1"
        />
        <Button type="submit" className="w-full sm:w-auto">
          Post
        </Button>
      </form>

      <div className="p-4" />

      <div>
        <ScrollArea className="h-[400px]">
          {postList.map(async (post) => {
            const user = await currentUser();
            if (!user) return null;
            return (
              <Card key={post.id} className="mb-3 overflow-hidden p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 flex-shrink-0 sm:h-12 sm:w-12">
                    <AvatarImage
                      src={user.imageUrl ?? undefined}
                      alt={`${user.firstName} ${user.lastName}'s profile`}
                    />
                    <AvatarFallback>
                      {user.firstName?.slice(0, 2).toUpperCase() ?? ""}
                      {user.lastName?.slice(0, 2).toUpperCase() ?? ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="truncate font-semibold">
                        {user.firstName}
                      </span>
                      <span className="whitespace-nowrap text-sm text-muted-foreground">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap break-all">
                      {post.content}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
}
