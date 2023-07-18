import React, { useState } from 'react'
import { Input } from '@/components'

const FormType = () => {
  const [name, setName] = useState<string>('')

  const onChangeName = (e: any) => { setName(e.target.value) }

  const handleUploadType = (e: any) => {
    e.preventDefault()
    console.log(name)
  }

  return (
    <form method="POST" encType='multipart/form-data' onSubmit={handleUploadType} className='flex flex-col gap-3 mt-5 w-full px-20 py-10'>
        <h1 className="font-semibold text-primary text-3xl md:text-[30px] md:w-[90%] md:leading-[90%] leading-[150%]">
            Add Type
        </h1>
        <p className="text-tersier text-sm lg:text-base md:w-[65%]">
            Adding new type for your events
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

export default FormType
