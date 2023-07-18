'use client'
import React, { useState } from 'react'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { articlesOnPage, eventMenus } from '@/data/staticData';
import { Add } from '@mui/icons-material'

export default function Home() {
const [activeMenu, setActiveMenu] = useState<string>('Events')

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Events'} />

      {/* Main */}
      <Main active={'Events'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[400px] h-full no-scrollbar scrollbar-hide">
                {
                  eventMenus?.map((menu, index) => (
                    <Link href={menu.link} about={menu.name} title={menu.name} key={index} onClick={(e) => setActiveMenu(menu.name)} className={`${menu.name == activeMenu ? 'bg-primary text-white' : 'bg-secondary text-primary'} font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>{menu.name}</Link>
                  ))
                }
        </div>
        <div className="grid grid-cols-3 gap-4">
            {
                  articlesOnPage.map((article, index) => (
                    <div key={index} className={`flex-col gap-2 md:items-center mb-4 md:gap-2 flex`}>
                      <Image 
                        width={100}
                        height={50}
                        src={article.coverLandscape}
                        alt={article.title}
                        title={article.title}
                        className='w-full md:flex-1 h-full rounded-xl object-cover'
                        priority
                      />

                      <div className="md:flex md:flex-1 flex-col gap hidden">
                        <h3 className="font-semibold text-2xl text-primary">
                          {article.title}
                        </h3>
                        <p className="font-normal text-base text-gray">
                          {article.snippets}
                        </p>

                        <p className="font-normal text-xs text-gray mt-5">
                          {article.publishedAt} | {article.duration} min read
                        </p>
                      </div>
                    </div>
                  ))
                }
        </div>

        <Link href={'/events/create'} about='Create Article' title='Create Article' className="flex items-center justify-center bg-secondary text-primary w-fit h-fit text-[3rem] p-2 font-semibold rounded-full absolute right-10 bottom-10 cursor-pointer hover:bg-primary hover:text-white duration-700 transition-all">
                <Add color='inherit' fontSize='inherit' />
        </Link>
      </Main>
    </main>
  )
}
