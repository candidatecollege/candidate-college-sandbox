'use client'
import React, { useEffect, useState } from 'react'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { eventMenus } from '@/data/staticData';
import { Add, Diversity1 } from '@mui/icons-material'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { formatDate } from '@/utils/time'
import { getToken } from '@/utils/token'

export default function Home() {
  const slug = usePathname().slice(8)
  const [event, setEvent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchEvent = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/events/${slug}`);

      setEvent(response.data.data)
      setIsLoading(false)
      console.log(response)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const storedToken = getToken()
  const router = useRouter()

  useEffect(() => {
    if (!storedToken) {
      router.push('/auth');
    }
  }, [storedToken, router]);

  useEffect(() => {
    fetchEvent()
  }, [])

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'events'} />

        {/* Main */}
        {
          isLoading ? 
          <section className="p-16 w-full h-screen overflow-scroll scrollbar-hide gap-4">

            <div className="flex flex-col gap-4 md:px-24">
                <div className="flex flex-col gap-4 pb-6 border-b border-b-gray items-center justify-center">
                    <div className=" md:w-[50%] py-10 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
                    </div>

                    <div className="flex flex-col gap-1 w-full items-center justify-center">
                        <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
                        <div className="w-2/3 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-center md:w-full pt-2 gap-4">
                    <div className='flex flex-row gap-2'>
                    <div className="w-[5rem] py-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
                    </div>  &nbsp; | &nbsp; <div className="w-[5rem] py-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
                    </div> | <div className="w-[5rem] py-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
                    </div>
                    </div>
                </div>
            </div>

            <div className='w-full h-[25vh] md:h-full my-6 rounded-xl bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse object-cover'></div>

            <div className="flex flex-col gap-1 w-full">
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div><div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div><div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div><div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div><div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div><div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
              <div className="w-2/3 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
            </div>

          </section> : 
          <section className="p-16 w-full h-screen overflow-scroll scrollbar-hide gap-4">

            <div className="flex flex-col gap-4 md:px-24">
                <div className="flex flex-col gap-4 pb-6 border-b border-b-gray">
                    <h1 className="font-semibold text-primary text-3xl md:text-[60px] md:text-center md:w-[100%] md:leading-[100%] leading-[150%]">
                    {event && event.name}
                    </h1>

                    <p className="text-tersier text-base md:text-base md:text-center md:w-[100%]">
                    {event && event.snippets}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-center md:w-full pt-2 gap-4">
                    <p className='text-sm text-primary'>
                    {event && event.category}  &nbsp; | &nbsp; {event && event.type} &nbsp; | &nbsp; {event && event.hosted_by}
                    </p>
                </div>
            </div>

            <Image 
                src={`https://resource.candidatecollegeind.com/storage/${event && event.cover_landscape}`}
                alt={event && event.title}
                title={event && event.title}
                width={100}
                height={0}
                className='w-full h-[25vh] md:h-full my-6 rounded-xl object-cover'
            />

            <div className="text-primary text-lg md:text-left w-full prose prose-rich-text" dangerouslySetInnerHTML={{ __html: event && event.body }} />

          </section>
        }
    </main>
  )
}
