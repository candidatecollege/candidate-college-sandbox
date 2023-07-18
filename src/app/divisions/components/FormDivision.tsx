import { Input } from '@/components'
import React, { useState } from 'react'

const FormDivision = () => {
    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [active, setActive] = useState<any>(null)

    const onChangeName = (e: any) => { setName(e.target.value) }
    const onChangeImage = (e: any) => { setImage(e.target.value) }
    const onChangeActive = (e: any) => { setActive(e.target.value) }
  
    const handleAddMember = (e: any) => {
      e.preventDefault()
      console.log(name)
    }
  
    return (
      <form method="POST" encType='multipart/form-data' onSubmit={handleAddMember} className='flex flex-col gap-3 mt-5 w-full px-20 py-10'>
          <h1 className="font-semibold text-primary text-3xl md:text-[30px] md:w-[90%] md:leading-[90%] leading-[150%]">
              Add Member
          </h1>
          <p className="text-tersier text-sm lg:text-base md:w-[65%]">
              Adding new member to database CC
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

          <Input 
            label="Image"
            name="cover"
            type="file"
            placeholder="Image"
            value={image}
            onChange={onChangeImage}
            width="full"
          />

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