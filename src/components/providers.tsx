import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { ThemeProvider } from '@/components/theme-provider'

import { SidebarProvider } from './ui/sidebar'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} afterSignOutUrl="/">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}
