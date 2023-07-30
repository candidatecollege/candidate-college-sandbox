import React, { useState } from 'react'
import { Input } from '@/components'
import axios, { isAxiosError } from 'axios';
import Swal from 'sweetalert2';
import { getToken } from '@/utils/token';

const FormType: React.FC<any> = ({ onClose, isEdit, category }) => {
  const storedToken = getToken()

  const [name, setName] = useState<string>(isEdit ? category.category.name : '')

  const onChangeName = (e: any) => { setName(e.target.value) }

  const handleUploadCategory = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)

    try {
        const response = await axios.post('https://resource.candidatecollegeind.com/api/event/types', formData, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'mulipart/form-data',
            },
        })
        console.log(response)
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Successfully uploaded your new event type!',
        });
        onClose()
    } catch (error) {
        console.error('Error posting data: ', error)
        if (isAxiosError(error) && error.response && error.response.status === 401) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'error',
            title: 'Failed to upload your new event type, unauthenticated!',
          })
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'error',
            title: 'Internal server error, please edit it later!',
          })
        }
        onClose()
    }

    setName('')
  }

  const handleEditCategory = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)

    try {
        const response = await axios.post(`https://resource.candidatecollegeind.com/api/event/types/${category.category.id}`, formData, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'mulipart/form-data',
            },
        })
        console.log(response)
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Successfully edit your type!',
        });

        onClose()
    } catch (error) {
        console.error('Error posting data: ', error)
        if (isAxiosError(error) && error.response && error.response.status === 401) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              icon: 'error',
              title: 'Failed to edit type, unauthenticated!',
            })
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              icon: 'error',
              title: 'Internal server error, please edit it later!',
            })
          }
          onClose()
    }

    setName('')
  }

  return (
    <form method="POST" encType='multipart/form-data' onSubmit={isEdit ? handleEditCategory : handleUploadCategory} className='flex flex-col gap-3 mt-5 w-full px-20 py-10'>
        <h1 className="font-semibold text-primary text-3xl md:text-[30px] md:w-[90%] md:leading-[90%] leading-[150%]">
            {
                isEdit ? 'Edit' : 'Add'
            } Type
        </h1>
        <p className="text-tersier text-sm lg:text-base md:w-[65%]">
            {
                isEdit ? 'Edit category for your events' : 'Adding new category for your events'
            }
        </p>

        <Input 
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={onChangeName}
            width='full'
        />

        <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>{isEdit ? 'Edit' : 'Upload'}</button>
    </form>
  )
}

export default FormType
