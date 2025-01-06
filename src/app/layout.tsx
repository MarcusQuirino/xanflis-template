import { type Metadata } from 'next'

import { GeistSans } from 'geist/font/sans'

import { AppSidebar } from '@/components/app-sidebar'
import Providers from '@/components/providers'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

import { LayoutHeader } from './(components)/layout-header'

export const metadata: Metadata = {
  title: 'Xanflis Template',
  description: 'build on top of 3T',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡️</text></svg>"
        />
      </head>
      <body
        className={cn(
          'min-w-screen h-screen overflow-hidden bg-background antialiased',
          GeistSans.variable
        )}
      >
        <Providers>
          <div className="flex h-full">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <LayoutHeader />
              <div className="container mx-auto p-4">
                <SidebarTrigger />
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
