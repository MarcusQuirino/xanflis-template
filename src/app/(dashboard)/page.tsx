import Link from 'next/link'

import { SignedIn, SignedOut } from '@clerk/nextjs'

import { SignButton } from '@/components/sign-in-button'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/client'

export default async function HomePage() {
  const res = await client.api.hello.$post({
    json: {
      title: 'Hello',
      body: 'World',
    },
  })
  const data = await res.json()
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
      <SignedIn>
        <Link
          href="/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Button>Go to Dashboard</Button>
        </Link>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-row items-center justify-center gap-2">
          <SignButton mode="signin" />
          <SignButton mode="signup" />
        </div>
      </SignedOut>
    </div>
  )
}
