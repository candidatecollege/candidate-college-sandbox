import React, { useState } from 'react'
import { Input } from '@/components'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormCategory = () => {
  const router    = useRouter()

  const [name, setName] = useState<string>('')

  const onChangeName = (e: any) => { setName(e.target.value) }

  const handleUploadCategory = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)

    try {
        const response = await axios.post('https://resource.candidatecollegeind.com/api/article/categories', formData, {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc291cmNlLmNhbmRpZGF0ZWNvbGxlZ2VpbmQuY29tL2FwaS9sb2dpbiIsImlhdCI6MTY4OTY5NDcwNiwiZXhwIjoxNjg5Njk4MzA2LCJuYmYiOjE2ODk2OTQ3MDYsImp0aSI6Ilo1VU50M3h3Z25ad3BQaW0iLCJzdWIiOiIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.tXuegI1dEgU7oPvSw52dBjxtFRelNOBCuy4yxbTOMI0`,
                'Content-Type': 'mulipart/form-data',
            },
        })
        console.log(response)
        if (response.data.status == 200) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                icon: 'success',
                title: 'Successfully uploaded your new article!',
            });

            router.push('/articles/categories')
        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'error',
                title: 'Failed to uploaded your new article, Unauthorized!',
            });
        }
    } catch (error) {
        console.error('Error posting data: ', error)
    }

    setName('')
  }

  return (
    <form method="POST" encType='multipart/form-data' onSubmit={handleUploadCategory} className='flex flex-col gap-3 mt-5 w-full px-20 py-10'>
        <h1 className="font-semibold text-primary text-3xl md:text-[30px] md:w-[90%] md:leading-[90%] leading-[150%]">
            Add Category
        </h1>
        <p className="text-tersier text-sm lg:text-base md:w-[65%]">
            Adding new category for your articles
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

        <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>Upload</button>
    </form>
  )
}

export default FormCategory
