import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { SignButton } from '@/components/sign-in-button'
import { ThemeToggle } from '@/components/theme-toggle'

export function LayoutHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <ThemeToggle />
      <div>
        <SignedOut>
          <SignButton mode="signin" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
