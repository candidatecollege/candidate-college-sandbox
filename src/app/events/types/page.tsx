'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Main, Sidebar } from '@/components'
import { articleMenus, eventMenus } from '@/data/staticData'
import { Add, Close } from '@mui/icons-material'
import { FormType } from '../components'

const Categories = () => {
  const [activeMenu, setActiveMenu] = useState<string>('Types')
  const [openModalAddType, setOpenModalAddType] = useState<boolean>(false)

  const ModalAddCategory = () => {
    return (
        <section className='w-full h-screen absolute md:flex md:items-start md:justify-center top-0 bg-[rgba(0,0,0,0.5)]'>
            <div className="flex flex-col-gap-2 bg-white rounded-xl h-fit opacity-100 mx-5 mt-[10vh] relative md:w-[45%]">
                <FormType />
                <span className='text-2xl absolute top-4 right-5 text-primary cursor-pointer' onClick={(e) => setOpenModalAddType(false)}>
                    <Close fontSize='inherit' color='inherit' />
                </span>
            </div>
        </section>
    )
  }

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Events'} />

      {/* Main */}
      <Main active={'Types'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
            <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[400px] h-full no-scrollbar scrollbar-hide">
              {
                eventMenus?.map((menu, index) => (
                  <Link href={menu.link} about={menu.name} title={menu.name} key={index} onClick={(e) => setActiveMenu(menu.name)} className={`${menu.name == activeMenu ? 'bg-primary text-white' : 'bg-secondary text-primary'} font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>{menu.name}</Link>
                ))
              }
            </div>

            <div onClick={(e) => setOpenModalAddType(true)} className="flex items-center justify-center bg-secondary text-primary w-fit h-fit text-[3rem] p-2 font-extrabold rounded-full absolute right-10 bottom-10 cursor-pointer hover:bg-primary hover:text-white duration-700 transition-all">
                <Add color='inherit' fontSize='inherit' fontWeight={700} />
            </div>
      </Main>
      
      {/* Modal Categories */}
      {
        openModalAddType ? (<ModalAddCategory />) : (null)
      }
    </main>
  )
}

export default Categories