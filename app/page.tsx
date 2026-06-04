import type { Metadata } from 'next'
import { Terminal } from '@/components/terminal/terminal'

export const metadata: Metadata = {
  title: 'Yeris Tech & Resources — Hack Product Building',
  description:
    'We make programming easy for you. A product studio architecting the space between ambition & reality. Miami / LATAM.',
}

export default function HomePage() {
  return <Terminal />
}
