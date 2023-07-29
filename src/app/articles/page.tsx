'use client'
import React, { useEffect, useState } from 'react'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { articlesOnPage, articleMenus } from '@/data/staticData';
import { Add } from '@mui/icons-material'
import axios from 'axios'

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string>('Articles')
  const [articles, setArticles] = useState<any[]>([])

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://resource.candidatecollegeind.com/api/articles');

      setArticles(response.data.data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const getMonthName = (monthNumber: any) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthNumber];
  }
  
  const formatDate = (inputDateString: any) => {
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = getMonthName(date.getUTCMonth());
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Articles'} />

      {/* Main */}
      <Main active={'Articles'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[500px] h-full no-scrollbar scrollbar-hide">
                {
                  articleMenus?.map((menu, index) => (
                    <Link href={menu.link} about={menu.name} title={menu.name} key={index} onClick={(e) => setActiveMenu(menu.name)} className={`${menu.name == activeMenu ? 'bg-primary text-white' : 'bg-secondary text-primary'} font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>{menu.name}</Link>
                  ))
                }
        </div>
        <div className="grid grid-cols-3 gap-4">
            {
                  articles.map((article, index) => (
                    <Link href={`/articles/${article.slug}`} about={article.title} title={article.title} key={index} className={`flex-col gap-2 mb-4 md:gap-2 flex`}>
                      <Image 
                        width={100}
                        height={50}
                        src={`https://resource.candidatecollegeind.com/storage/${article.cover_landscape}`}
                        alt={article.title}
                        title={article.title}
                        className='w-full h-full md:w-full md:h-[178px] rounded-xl object-cover'
                        priority
                      />

                      <div className="md:flex flex-col gap hidden text-left">
                        <h3 className="font-semibold text-2xl text-primary">
                          {article.title}
                        </h3>
                        <p className="font-normal text-base text-tersier">
                          {article.snippets}
                        </p>

                        <p className="font-normal text-xs text-gray mt-5">
                          {formatDate(article.created_at)} | {article.duration} min read
                        </p>
                      </div>
                    </Link>
                  ))
                }
        </div>

        <Link href={'/articles/create'} about='Create Article' title='Create Article' className="flex items-center justify-center bg-secondary text-primary w-fit h-fit text-[3rem] p-2 font-semibold rounded-full absolute right-10 bottom-10 cursor-pointer hover:bg-primary hover:text-white duration-700 transition-all">
                <Add color='inherit' fontSize='inherit' />
        </Link>
      </Main>
    </main>
  )
}
