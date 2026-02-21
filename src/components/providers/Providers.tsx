'use client'

import { ContentProvider } from '@/context/ContentContext'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <ContentProvider>
      <div className="theme-textil min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {!isAdmin && <Navbar />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
      </div>
      <WhatsAppButton />
    </ContentProvider>
  )
}
