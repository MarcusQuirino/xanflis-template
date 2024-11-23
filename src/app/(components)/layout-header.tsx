import { SignInButton } from "@/components/sign-in-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function LayoutHeader() {
  return (
    <header className="borderb-b-foreground flex h-20 flex-row items-center justify-between border p-2">
      <ThemeToggle />
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
