'use client'
import React, { useEffect, useState } from 'react'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { articlesOnPage, eventMenus } from '@/data/staticData';
import { AddRounded } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { getToken } from '@/utils/token'
import axios from 'axios'
import Card from '@/components/Card'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Home() {
  const router = useRouter()
  const storedToken = getToken()
  const [activeMenu, setActiveMenu] = useState<string>('Events')
  const [events, setEvents] = useState<any[]>([])
  const eventsOnLoading: any = [1, 2, 3, 4, 5, 6]
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchEvents = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get('https://resource.candidatecollegeind.com/api/events');

      setTimeout(() => {
        setEvents(response.data.data)
        setIsLoading(false) // After setting the data, set isLoading to false
      }, 2000)
      
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const handleDeleteEvent = async (slug: any) => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete the event. This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1B4E6B',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then(async (result: any) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`https://resource.candidatecollegeind.com/api/events/${slug}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                console.log(response);

                // Optionally show a success message
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'The event has been deleted.',
                    icon: 'success',
                });

                // Perform any other actions after successful deletion, e.g., redirecting the user, refreshing the article list, etc.
                fetchEvents()

            } catch (error) {
                console.error(error);

                // Show an error message if the delete operation fails
                MySwal.fire({
                    title: 'Error',
                    text: 'Failed to delete the event. Please try again later.',
                    icon: 'error',
                });
            }
        }
    })
  }

  useEffect(() => {
    if (!storedToken) {
      router.push('/auth')
    }
  }, [storedToken, router])

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Events'} />

      {/* Main */}
      <Main active={'Events'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[800px] h-full no-scrollbar scrollbar-hide">
                {
                  eventMenus?.map((menu, index) => (
                    <Link href={menu.link} about={menu.name} title={menu.name} key={index} onClick={(e) => setActiveMenu(menu.name)} className={`${menu.name == activeMenu ? 'bg-primary text-white' : 'bg-secondary text-primary'} font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-fit duration-700 transition-all`}>{menu.name}</Link>
                  ))
                }
        </div>
        <div className="grid grid-cols-3 gap-4">
          {
              isLoading ? 
              eventsOnLoading.map((event: any, index: any) => (
                <Card data={event} type={'Event'} isLoading={true} key={index} onDelete={() => handleDeleteEvent(event.slug)} />
              ))
              :
              events.map((event: any, index: any) => (
                <Card data={event} type={'Event'} isLoading={false} key={index} onDelete={() => handleDeleteEvent(event.slug)} />
              ))
          }
        </div>

        <Link href={'/events/create'} about='Create Article' title='Create Article' className="flex items-center justify-center bg-secondary text-primary w-fit h-fit text-[3rem] p-2 font-semibold rounded-full absolute right-10 bottom-10 cursor-pointer hover:bg-primary hover:text-white duration-700 transition-all">
                <AddRounded color='inherit' fontSize='inherit' />
        </Link>
      </Main>
    </main>
  )
}
