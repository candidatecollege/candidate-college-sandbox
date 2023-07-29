'use client'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  if (!localStorage.getItem('token')) {
    router.push('/auth')
  }

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
