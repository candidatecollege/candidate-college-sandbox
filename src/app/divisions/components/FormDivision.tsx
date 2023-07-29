import { Input } from '@/components'
import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const FormDivision: React.FC<any> = ({ closeModal }) => {
    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<any>(null)
    const [active, setActive] = useState<any>(null)

    const onChangeName = (e: any) => { setName(e.target.value) }
    const onChangeImage = (e: any) => { setImage(e.target.value) }
    const onChangeActive = (e: any) => { setActive(e.target.value) }
  
    const handleAddDivision = async (e: any) => {
      e.preventDefault()
      
      const formData = new FormData()
      formData.append('name', name)
      formData.append('image', image)
      formData.append('active', active)

      try {
        const response = await axios.post('https://resource.candidatecollegeind.com/api/divisions', formData, {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc291cmNlLmNhbmRpZGF0ZWNvbGxlZ2VpbmQuY29tL2FwaS9sb2dpbiIsImlhdCI6MTY4OTcyOTA5MiwiZXhwIjoxNjg5NzMyNjkyLCJuYmYiOjE2ODk3MjkwOTIsImp0aSI6ImZ1WFdDQXlYeGM4SkVLTWkiLCJzdWIiOiIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.-TpSU2Pou6CbroB9h0IJ5gU71d19Kgln-_fD9a2vzWk`,
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
                title: 'Successfully uploaded your new division!',
            });

            closeModal()
        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'error',
                title: 'Failed to uploaded your new division, Unauthorized!',
            });
        }
      } catch (error) {
          console.error('Error posting data: ', error)
      }

      setName('')
      setImage(null)
      setActive(null)
    }
  
    return (
      <form method="POST" encType='multipart/form-data' onSubmit={handleAddDivision} className='flex flex-col gap-3 mt-5 w-full px-20 py-10'>
          <h1 className="font-semibold text-primary text-3xl md:text-[30px] md:w-[90%] md:leading-[90%] leading-[150%]">
              Add Division
          </h1>
          <p className="text-tersier text-sm lg:text-base md:w-[65%]">
              Adding new division to database CC
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

        <fieldset className="space-y-1 dark:text-gray-100">
          <label htmlFor="Image" className="block text-base text-gray-400">
            Image
          </label>
          <div className="flex">
            <input
              type="file"
              name="image"
              id="Image"
              className={`px-8 py-12 border-2 rounded-xl dark:border-gray-200 text-primary w-full`}
              onChange={(e: any) => setImage(e.target.files[0])}
            />
          </div>
        </fieldset>

          <Input 
              label="Active"
              name="active"
              type="number"
              placeholder="Active (0/1)"
              value={active}
              onChange={onChangeActive}
              width='full'
          />
  
          <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>Add</button>
      </form>
    )
}

export default FormDivision