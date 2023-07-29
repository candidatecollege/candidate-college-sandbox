'use client'
import React, { useEffect, useState } from 'react'
import { Main, Sidebar } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { articlesOnPage, articleMenus } from '@/data/staticData';
import { AddRounded } from '@mui/icons-material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Home() {
  const router = useRouter()

  if (!localStorage.getItem('token')) {
    router.push('/auth')
  }

  const [activeMenu, setActiveMenu] = useState<string>('Articles')
  const [articles, setArticles] = useState<any[]>([])
  const articlesOnLoading: any = [1, 2, 3, 4, 5, 6]
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchArticles = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get('https://resource.candidatecollegeind.com/api/articles');

      setTimeout(() => {
        setArticles(response.data.data)
        setIsLoading(false) // After setting the data, set isLoading to false
      }, 2000)
      
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const handleDeleteArticle = async (slug: any) => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete the article. This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1B4E6B',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then(async (result: any) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`https://resource.candidatecollegeind.com/api/articles/${slug}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                console.log(response);

                // Optionally show a success message
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'The article has been deleted.',
                    icon: 'success',
                });

                // Perform any other actions after successful deletion, e.g., redirecting the user, refreshing the article list, etc.
                fetchArticles()

            } catch (error) {
                console.error(error);

                // Show an error message if the delete operation fails
                MySwal.fire({
                    title: 'Error',
                    text: 'Failed to delete the article. Please try again later.',
                    icon: 'error',
                });
            }
        }
    })
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
              isLoading ? 
              articlesOnLoading.map((article: any, index: any) => (
                <Card article={article} isLoading={true} key={index} onDelete={() => handleDeleteArticle(article.slug)} />
              ))
              :
              articles.map((article: any, index: any) => (
                <Card article={article} isLoading={false} key={index} onDelete={() => handleDeleteArticle(article.slug)} />
              ))
            }
        </div>

        <Link href={'/articles/create'} about='Create Article' title='Create Article' className="flex items-center justify-center bg-secondary text-primary w-fit h-fit text-[3rem] p-2 font-semibold rounded-full absolute right-10 bottom-10 cursor-pointer hover:bg-primary hover:text-white duration-700 transition-all">
                <AddRounded color='inherit' fontSize='inherit' />
        </Link>
      </Main>
    </main>
  )
}
