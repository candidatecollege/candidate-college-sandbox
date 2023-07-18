'use client'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Dashboard'} />

      {/* Main */}
      <Main active={'Dashboard'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
        
      </Main>
    </main>
  )
}
