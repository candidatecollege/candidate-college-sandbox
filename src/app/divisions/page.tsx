'use client'
import React, { useState } from 'react'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { articlesOnPage, divisionMenus } from '@/data/staticData';
import { Add, Close } from '@mui/icons-material'
import { FormDivision } from './components'

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string>('Divisions')
  const [openModalAddDivision, setOpenModalAddDivision] = useState<boolean>(false)

  const ModalAddMember = () => {
    return (
        <section className='w-full h-screen absolute md:flex md:items-start md:justify-center top-0 bg-[rgba(0,0,0,0.5)]'>
            <div className="flex flex-col-gap-2 bg-white rounded-xl h-fit opacity-100 mx-5 mt-[10vh] relative md:w-[45%]">
                <FormDivision />
                <span className='text-2xl absolute top-4 right-5 text-primary cursor-pointer' onClick={(e) => setOpenModalAddDivision(false)}>
                    <Close fontSize='inherit' color='inherit' />
                </span>
            </div>
        </section>
    )
  }

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Divisions'} />

      {/* Main */}
      <Main active={'Divisions'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[200px] h-full no-scrollbar scrollbar-hide">
                {
                  divisionMenus?.map((menu, index) => (
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

        <div onClick={(e) => setOpenModalAddDivision(true)} className="flex items-center justify-center bg-secondary text-primary w-fit h-fit text-[3rem] p-2 font-extrabold rounded-full absolute right-10 bottom-10 cursor-pointer hover:bg-primary hover:text-white duration-700 transition-all">
            <Add color='inherit' fontSize='inherit' fontWeight={700} />
        </div>
      </Main>

      {/* Modal Member */}
      {
        openModalAddDivision ? (<ModalAddMember />) : (null)
      }
    </main>
  )
}
