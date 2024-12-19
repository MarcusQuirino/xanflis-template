import { SignedIn } from "@clerk/nextjs";

import { client } from "@/lib/client";
import { PostThing } from "./(components)/post-thing";

export default async function HomePage() {
  const res = await client.api.hello.$post({
    json: {
      title: "Hello",
      body: "World",
    },
  });
  const data = await res.json();
  return (
    <div className="flex h-full w-full flex-col items-center justify-around p-4">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
          Xanflis Template ⚡
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
          by: Southlike Software
        </p>
      </div>
      <div className="p-4" />
      <div className="w-full">
        <SignedIn>
          <PostThing />
        </SignedIn>
      </div>
    </div>
  );
}
