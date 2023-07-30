import { formatDate } from '@/utils/time'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PenIcon, TrashIcon } from './icons'

const Card: React.FC<any> = ({ data, isLoading, onDelete, type }) => {
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
                        <div className="w-2/3 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
                    </div>

                    <div className="w-[8rem] py-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
                    </div>
                </div>
            </div>
            :
            <div className={`flex-col gap-2 mb-4 md:gap-2 flex relative`}>
                <div className="w-full h-full md:w-full md:h-[178px] rounded-xl object-cover relative">
                    <div className="flex flex-row gap-2 absolute top-2 right-2">
                        <Link href={`/${type == 'Article' ? 'articles' : 'events'}/edit/${data.slug}`} title={data.title} about={data.title} className='bg-secondary rounded-lg flex items-center justify-center p-2 duration-700 transition-all'>
                            <PenIcon size={'24'} color={'#1f1f1f'} />
                        </Link>
                        <button onClick={(e) => onDelete(e)} type="button" className='bg-red-600 rounded-lg flex items-center justify-center p-2 duration-700 transition-all'>
                            <TrashIcon size={'24'} color={'#FFF'} />
                        </button>
                    </div>
                    <Image 
                        width={100}
                        height={50}
                        src={`https://resource.candidatecollegeind.com/storage/${data.cover_landscape}`}
                        alt={data.title}
                        title={data.title}
                        className='w-full h-full md:w-full md:h-[178px] rounded-xl object-cover'
                        priority
                    />
                </div>

                <div className="md:flex flex-col gap hidden text-left">
                    <Link href={`/datas/${data.slug}`} about={data.title} title={data.title}  className="font-semibold text-2xl text-primary">
                      {
                        type == 'Article' ? data.title : data.name
                      }
                    </Link>

                    <p className="font-normal text-base text-tersier">
                      {data.snippets?.substring(0, 250)}
                    </p>
                    
                    {
                        type == 'Article' ? 
                        <p className="font-normal text-xs text-gray mt-5">
                            {formatDate(data.created_at)} | {data.duration} min read
                        </p> 
                        : 
                        null
                    }
                </div>
            </div>
        }
    </>
  )
}

export default Card
