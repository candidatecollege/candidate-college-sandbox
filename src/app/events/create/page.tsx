'use client'
import React, { useEffect, useState } from 'react'
import { Main, Sidebar } from '@/components'
import Link from 'next/link'
import { eventMenus } from '@/data/staticData';
import { ArrowBackIos } from '@mui/icons-material'
import { FormEvent } from '../components';
import { getToken } from '@/utils/token';
import { useRouter } from 'next/navigation';

export default function Create() {
  const [activeMenu, setActiveMenu] = useState<string>('Create Article')
  const storedToken = getToken()
  const router = useRouter()

  useEffect(() => {
    if (!storedToken) {
      router.push('/auth');
    }
  }, [storedToken, router]);

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Events'} />

      {/* Main */}
      <Main active={'Events'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
            <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[850px] h-full no-scrollbar scrollbar-hide">
              <Link href={'/events'} about={'Events'} title={'Events'} className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:pl-5 md:pr-4 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-fit h-fit duration-700 transition-all text-4xl`}><ArrowBackIos color='inherit' fontSize='inherit' /> </Link>
              {
                eventMenus?.map((menu, index) => (
                  <Link href={menu.link} about={menu.name} title={menu.name} key={index} onClick={(e) => setActiveMenu(menu.name)} className={`${menu.name == activeMenu ? 'bg-primary text-white' : 'bg-secondary text-primary'} font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-fit duration-700 transition-all`}>{menu.name}</Link>
                ))
              }
            </div>

            <FormEvent />
      </Main>
    </main>
  )
}
