'use client'
import React, { useEffect, useState } from 'react'
import { ListItemMember, Main, Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { articlesOnPage, memberMenus } from '@/data/staticData';
import { Add, Close } from '@mui/icons-material'
import { FormMember } from './components'
import axios from 'axios'

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string>('Members')
  const [openModalAddMember, setOpenModalAddMember] = useState<boolean>(false)

  const closeModal = () => {
    setOpenModalAddMember(false)
  }

  const ModalAddMember = () => {
    return (
      <section className='w-full h-screen absolute md:flex md:items-start md:justify-center top-0 bg-[rgba(0,0,0,0.5)]'>
        <div className="flex flex-col-gap-2 bg-white rounded-xl h-fit opacity-100 mx-5 mt-[2vh] relative md:w-[65%]">
            <FormMember closeModal={closeModal} onUploadMember={handleUploadMember} />
            <span className='text-2xl absolute top-4 right-5 text-primary cursor-pointer' onClick={(e) => setOpenModalAddMember(false)}>
              <Close fontSize='inherit' color='inherit' />
            </span>
        </div>
      </section>
    )
  }

  const [members, setMembers] = useState<any[]>([])

  const fetchMembers = async () => {
    try { 
      const response = await axios.get('https://resource.candidatecollegeind.com/api/members')
      setMembers(response.data.data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUploadMember = async (data: any) => {
    try {
      const response = await axios.post('https://resource.candidatecollegeind.com/api/members', data, {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc291cmNlLmNhbmRpZGF0ZWNvbGxlZ2VpbmQuY29tL2FwaS9sb2dpbiIsImlhdCI6MTY4OTczMjc5MSwiZXhwIjoxNjg5NzM2MzkxLCJuYmYiOjE2ODk3MzI3OTEsImp0aSI6IlJabjZuVkNzYjNGNmpCczgiLCJzdWIiOiIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.4rP2nkB-I-AHzuzicv6YUkeyTdAQDzHOeoqV_2ZdjUw`,
            'Content-Type': 'mulipart/form-data',
          }
      })

      if (response.status === 200) {
        fetchMembers()
        setMembers(members)
      }

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteMember = async (id: number) => {
    try {
      const response = await axios.delete(`https://resource.candidatecollegeind.com/api/members/${id}`, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc291cmNlLmNhbmRpZGF0ZWNvbGxlZ2VpbmQuY29tL2FwaS9sb2dpbiIsImlhdCI6MTY4OTczMjc5MSwiZXhwIjoxNjg5NzM2MzkxLCJuYmYiOjE2ODk3MzI3OTEsImp0aSI6IlJabjZuVkNzYjNGNmpCczgiLCJzdWIiOiIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.4rP2nkB-I-AHzuzicv6YUkeyTdAQDzHOeoqV_2ZdjUw`
        }
      })

      if (response.status === 200) {
        setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id))
      }

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Members'} />

      {/* Main */}
      <Main active={'Members'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[200px] h-full no-scrollbar scrollbar-hide">
          {
            memberMenus?.map((menu, index) => (
              <Link href={menu.link} about={menu.name} title={menu.name} key={index} onClick={(e) => setActiveMenu(menu.name)} className={`${menu.name == activeMenu ? 'bg-primary text-white' : 'bg-secondary text-primary'} font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>{menu.name}</Link>
            ))
          }
        </div>
        
        <div className="flex flex-col gap-3">
          {
            members.map((member, index) => (
              <ListItemMember key={index} member={member} onDeleteMember={handleDeleteMember} />
            ))
          }
        </div>

        <div onClick={(e) => setOpenModalAddMember(true)} className="flex items-center justify-center bg-secondary text-primary w-fit h-fit text-[3rem] p-2 font-extrabold rounded-full absolute right-10 bottom-10 cursor-pointer hover:bg-primary hover:text-white duration-700 transition-all">
            <Add color='inherit' fontSize='inherit' fontWeight={700} />
        </div>
      </Main>

      {/* Modal Member */}
      {
        openModalAddMember ? (<ModalAddMember />) : (null)
      }
    </main>
  )
}
