'use client'
import React, { useEffect, useState } from 'react'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { articlesOnPage, articleMenus } from '@/data/staticData';
import { Add } from '@mui/icons-material'
import axios from 'axios'
import { usePathname } from 'next/navigation'

export default function Home() {
  const slug = usePathname().slice(10)
  const [article, setArticle] = useState<any>(null)

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`https://resource.candidatecollegeind.com/api/articles/${slug}`);

      setArticle(response.data.data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const getMonthName = (monthNumber) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthNumber];
  }
  
  const formatDate = (inputDateString) => {
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = getMonthName(date.getUTCMonth());
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    fetchArticle()
  }, [])

  console.log(slug)

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Articles'} />

        {/* Main */}
        <section className="p-16 w-full h-screen overflow-scroll scrollbar-hide gap-4">

            <div className="flex flex-col gap-4 md:px-24">
                <div className="flex flex-col gap-4 pb-6 border-b border-b-gray">
                    <h1 className="font-semibold text-primary text-3xl md:text-[60px] md:text-center md:w-[100%] md:leading-[100%] leading-[150%]">
                    {article && article.title}
                    </h1>

                    <p className="text-tersier text-base md:text-base md:text-center md:w-[100%]">
                    {article && article.snippets}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-center md:w-full pt-2 gap-4">
                    <p className='text-sm text-primary'>
                    {article && article.duration} Min Read  &nbsp; | &nbsp; {formatDate(article && article.created_at)} | {article && article.category}
                    </p>
                </div>
            </div>

            <Image 
                src={`https://resource.candidatecollegeind.com/storage/${article && article.cover_landscape}`}
                alt={article && article.title}
                title={article && article.title}
                width={100}
                height={0}
                className='w-full h-[25vh] md:h-full my-6 rounded-xl object-cover'
            />

            <div className="text-primary text-base md:text-left w-full" dangerouslySetInnerHTML={{ __html: article && article.body }} />

        </section>
    </main>
  )
}
