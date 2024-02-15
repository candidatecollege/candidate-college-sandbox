import { Input } from '@/components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FormMember: React.FC<any> = ({ closeModal, onUploadMember }) => {
    const [divisions, setDivisions] = useState<any[]>([])

    const fetchDivisions = async () => {
      try {
        const response = await axios.get('/api/divisions')
        setDivisions(response.data.data)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }

    const [name, setName] = useState<string>('')
    const [division, setDivision] = useState<string>('')
    const [batch, setBatch] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [position, setPosition] = useState<string>('')
    const [instagram, setInstagram] = useState<string>('')
    const [linkedin, setLinkedin] = useState<string>('')
    const [twitter, setTwitter] = useState<string>('')

    const onChangeName = (e: any) => { setName(e.target.value) }
    const onChangeDivision = (e: any) => { setDivision(e.target.value) }
    const onChangeBatch = (e: any) => { setBatch(e.target.value) }
    const onChangePosition = (e: any) => { setPosition(e.target.value) }
    const onChangeInstagram = (e: any) => { setInstagram(e.target.value) }
    const onChangeLinkedin = (e: any) => { setLinkedin(e.target.value) }
    const onChangeTwitter = (e: any) => { setTwitter(e.target.value) }
  
    const handleAddMember = async (e: any) => {
      e.preventDefault()
      
      const formData = new FormData()
      formData.append('name', name)
      formData.append('division_id', division)
      formData.append('batch', batch)
      formData.append('image', image)
      formData.append('position', position)
      formData.append('instagram', instagram)
      formData.append('linkedin', linkedin)
      formData.append('twitter', twitter)

      try {
        onUploadMember(formData)
        closeModal()
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchDivisions()
    }, [])
  
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
          
          <div className="flex flex-row w-full gap-3">
            <Input 
                label="Division"
                name="division_id"
                type="select"
                placeholder="Division"
                value={division}
                onChange={onChangeDivision}
                isSelect={true}
                values={divisions}
                width="full"
            />

            <Input 
                label="Batch"
                name="batch"
                type="number"
                placeholder="Batch"
                value={batch}
                onChange={onChangeBatch}
                width='full'
            />
          </div>

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
            label="Position"
            name="position"
            type="select"
            placeholder="Position"
            value={position}
            onChange={onChangePosition}
            isSelect={true}
            values={
                [
                    { id: 1, name: 'Staff', },
                    { id: 2, name: 'Head of Division', },
                    { id: 3, name: 'Co-Head of Division', },
                    { id: 4, name: 'Chief', },
                    { id: 5, name: 'Founder', },
                    { id: 6, name: 'Manager', },
                    { id: 6, name: 'General Manager', },
                ]
            }
            width="full"
         />

          <div className="flex flex-row w-full gap-3">
            <Input 
              label="Instagram"
              name="instagram"
              type="text"
              placeholder="Instagram"
              value={instagram}
              onChange={onChangeInstagram}
              width='full'
            />

            <Input 
              label="Linkedin"
              name="linkedin"
              type="text"
              placeholder="Linkedin"
              value={linkedin}
              onChange={onChangeLinkedin}
              width='full'
            />

            <Input 
              label="Twitter"
              name="twitter"
              type="text"
              placeholder="Twitter"
              value={twitter}
              onChange={onChangeTwitter}
              width='full'
            />
          </div>
  
          <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>Add</button>
      </form>
    )
}

export default FormMember