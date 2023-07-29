import { formatDate } from '@/utils/time'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card: React.FC<any> = ({ article, isLoading }) => {
  return (
    <>
        {
            isLoading ? 
            <div  className={`flex-col gap-2 mb-4 md:gap-2 flex`}>
                <div
                    className='w-full h-full md:w-full md:h-[178px] rounded-xl object-cover bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse'
                ></div>

                <div className="md:flex flex-col gap-3 hidden text-left">
                    <div className="w-[5rem] py-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
                        <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
                        <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
                        <div className="w-full py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
                        <div className="w-2/3 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
                    </div>

                    <div className="w-[8rem] py-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
                    </div>
                </div>
            </div>
            :
            <div className={`flex-col gap-2 mb-4 md:gap-2 flex`}>
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
                    <Link href={`/articles/${article.slug}`} about={article.title} title={article.title}  className="font-semibold text-2xl text-primary">
                      {article.title}
                    </Link>
                    
                    <p className="font-normal text-base text-tersier">
                      {article.snippets.substring(0, 250)}
                    </p>

                    <p className="font-normal text-xs text-gray mt-5">
                      {formatDate(article.created_at)} | {article.duration} min read
                    </p>
                </div>
            </div>
        }
    </>
  )
}

export default Card
