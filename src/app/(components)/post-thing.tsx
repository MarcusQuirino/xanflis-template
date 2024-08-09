import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function PostThing() {
  const postList = await db.query.posts.findMany();
  return (
    <div>
      <form
        action={async (formData: FormData) => {
          "use server";

          const post = formData.get("post") as string;
          if (post === null) return;

          await db.insert(posts).values({ name: post });

          revalidatePath("/");
        }}
        className="flex flex-row gap-2"
      >
        <Input id="post" name="post" />
        <Button type="submit">Post</Button>
      </form>
      <span>Posts</span>
      <ol>
        {postList.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
      </ol>
    </div>
  );
}
