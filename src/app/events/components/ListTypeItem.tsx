import { PenIcon, TrashIcon } from '@/components/icons'
import React from 'react'

const ListTypeItem: React.FC<any> = ({ type, handleDeleteType, isLoading, onEdit }) => {
  return (
    <>
        {
            isLoading ?
            <li className="border-gray-400 flex flex-row mb-2 w-[50%] relative items-center bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse">
                <div className="select-none cursor-pointer bg-gray-100 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse"></div>
                    <div className="flex-1 pl-1 mr-16">
                        <div className="font-medium w-2/3 py-3 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse"></div>
                    </div>
                </div>
            </li>
        :
        <li className="border-gray-400 flex flex-row mb-2 w-[50%] relative items-center">
            <div className="select-none cursor-pointer bg-gray-100 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">📦</div>
                <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium">{type.name}</div>
                </div>
            </div>

            <div className="flex flex-row gap-2 absolute right-2">
                <button type="button" onClick={(e) => onEdit(type)} className='bg-secondary rounded-lg flex items-center justify-center p-2 duration-700 transition-all'>
                    <PenIcon size={'24'} color={'#1f1f1f'} />
                </button>
                <button type="button" onClick={(e) => handleDeleteType(type.id)} className='bg-red-600 rounded-lg flex items-center justify-center p-2 duration-700 transition-all'>
                    <TrashIcon size={'24'} color={'#FFF'} />
                </button>
            </div>
        </li>
        }
    </>
  )
}

export default ListTypeItem
