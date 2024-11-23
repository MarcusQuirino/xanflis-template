import { createUser } from "@/lib/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  try {
    const createdUser = await createUser({
      clerkId: userId,
    });

    console.log("User created:", createdUser);
    return (
      <div className="container mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center py-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome, {user.firstName}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Your account has been successfully created. You can now start using
            the platform.
          </p>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Get Started
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return (
      <div className="container mx-auto max-w-2xl py-8">
        <h1 className="text-3xl font-bold text-red-600">
          Error creating your profile. Please try again later.
        </h1>
      </div>
    );
  }
}
