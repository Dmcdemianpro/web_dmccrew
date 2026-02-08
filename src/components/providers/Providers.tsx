'use client'

import { ContentProvider } from '@/context/ContentContext'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ContentProvider>
      {children}
      <WhatsAppButton />
    </ContentProvider>
  )
}
