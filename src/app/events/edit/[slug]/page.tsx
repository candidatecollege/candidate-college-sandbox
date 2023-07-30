'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Input, Main, Sidebar } from '@/components'
import Link from 'next/link'
import { articleMenus } from '@/data/staticData';
import { FormEvent } from '../../components'
import { ArrowBackIos } from '@mui/icons-material'
import axios, { isAxiosError } from 'axios';
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react'
import Image from 'next/image';
import { PenIcon } from '@/components/icons';
import { getToken } from '@/utils/token';
import { setCategoryId } from '@/utils/categoy';

export default function Edit() {
  const slug = usePathname().slice(13)
  const [activeMenu, setActiveMenu] = useState<string>('Edit Event')
  const [categories, setCategories] = useState<any[]>([])
  const [types, setTypes] = useState<any[]>([])
  const [event, setEvent] = useState<any>(null)
  const router = useRouter()
  const storedToken = getToken()

  useEffect(() => {
    if (!storedToken) {
      router.push('/auth');
    }
  }, [storedToken, router]);

  const fetchEvent = async () => {
    try {
        const response = await axios.get(`https://resource.candidatecollegeind.com/api/events/${slug}`)

        setEvent(response.data.data)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
  }

  const editorRef = useRef<any>(null);

  const [name, setName] = useState<string>('')

  const [category, setCategory] = useState<string>('')
  const [categoryOld, setCategoryOld] = useState<string>('')

  const [type, setType] = useState<string>('')
  const [typeOld, setTypeOld] = useState<string>('')

  const [linkRegistration, setLinkRegistration] = useState<string>('')
  const [hostedBy, setHostedBy] = useState<any>(null)
  const [snippets, setSnippets] = useState<string>('')
  const [cover, setCover] = useState<any>(null)
  const [coverLandscape, setCoverLandscape] = useState<any>(null)
  const [body, setBody] = useState<string>('')

  const [oldCover, setOldCover] = useState<string>('')
  const [oldCoverLandscape, setOldCoverLandscape] = useState<string>('')

  const [startDateTime, setStartDateTime] = useState<string>('')
  const [registrationDateTime, setRegistrationDateTime] = useState<string>('')
  const [endRegistrationDateTime, setEndRegistrationDateTime] = useState<string>('')
  const [endDateTime, setEndDateTime] = useState<string>('')

  const [isEditCover, setIsEditCover] = useState<boolean>(false)
  const [isEditCoverLandscape, setIsEditCoverLandscape] = useState<boolean>(false)

  const toggleIsEditCover = () => {
    setIsEditCover(!isEditCover)
  }

  const toggleIsEditCoverLandscape = () => {
    setIsEditCoverLandscape(!isEditCoverLandscape)
  }

  const onChangeName = (e: any) => { setName(e.target.value) }
  const onChangeHostedBy = (e: any) => { setHostedBy(e.target.value) }
  const onChangeLinkRegistration = (e: any) => { setLinkRegistration(e.target.value) }
  const onChangeCategory = (e: any) => { setCategory(e.target.value) }
  const onChangeType = (e: any) => { setType(e.target.value) }
  const onChangeSnippets = (e: any) => { setSnippets(e.target.value) }
  const onChangeStartDateTime = (e: any) => { setStartDateTime(e.target.value) }
  const onChangeRegistrationDateTime = (e: any) => { setRegistrationDateTime(e.target.value) }
  const onChangeEndRegistrationDateTime = (e: any) => { setEndRegistrationDateTime(e.target.value) }
  const onChangeEndDateTime = (e: any) => { setEndDateTime(e.target.value) }
  const onChangeBody = (content: any, editor: any) => {
    setBody(content);
  }

  const handleEditEvent = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)

    const oldCategorySelected = setCategoryId(categoryOld, categories)
    const oldTypeSelected = setCategoryId(typeOld, types)

    if (category != '') {
      formData.append('category_id', category)
    } else {
      formData.append('category_id', oldCategorySelected.toString())
    }

    if (type != '') {
        formData.append('type_id', type)
      } else {
        formData.append('type_id', oldTypeSelected.toString())
      }

    formData.append('link_registration', linkRegistration)

    if (cover != null) {
        formData.append('cover', cover)
    }

    if (coverLandscape != null) {
        formData.append('cover_landscape', coverLandscape)
    }

    formData.append('hosted_by', hostedBy)
    formData.append('snippets', snippets)
    formData.append('body', body)
    formData.append('start_date_time', startDateTime)
    formData.append('registration_date_time', registrationDateTime)
    formData.append('end_registration_date_time', endRegistrationDateTime)
    formData.append('end_date_time', endDateTime)

    try {
        const response = await axios.post(`https://resource.candidatecollegeind.com/api/events/${slug}`, formData, {
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
          title: 'Successfully edited your event!',
        });

        router.push('/events')
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
            title: 'Failed to edit event, unauthenticated!',
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

          router.push('/events')
        }
    }

    setName('')
    setCategory('')
    setType('')
    setLinkRegistration('')
    setCover(null)
    setCoverLandscape(null)
    setHostedBy('')
    setSnippets('')
    setBody('')
    setStartDateTime('')
    setRegistrationDateTime('')
    setEndRegistrationDateTime('')
    setEndDateTime('')
  }

  const handleImageUpload = async (file: any, success: any, failure: any) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Replace 'YOUR_IMAGE_UPLOAD_API_URL' with your API endpoint for image uploads
      const response = await axios.post('https://resource.candidatecollegeind.com/api/articles/image/upload', formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response)
      const imageUrl = response.data.url;
      success(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      failure('Image upload failed');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://resource.candidatecollegeind.com/api/event/categories');

      setCategories(response.data.data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://resource.candidatecollegeind.com/api/event/types');

      setTypes(response.data.data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchTypes()
    fetchEvent()
  }, [])
  
  useEffect(() => {
    // Only set the state values if the article data is available
    if (event) {
        setName(event.name ?? '')
        setCategory('')
        setCategoryOld(event?.category ?? '');
        setTypeOld(event?.type ?? '');
        setType('')
        setLinkRegistration(event.link_registration ?? '')
        setCover(null);
        setCoverLandscape(null);
        setOldCover(event?.cover ?? '');
        setOldCoverLandscape(event?.cover_landscape ?? '');
        setHostedBy(event.hosted_by ?? '')
        setSnippets(event.snippets ?? '')
        setBody(event.body ?? '')
        setStartDateTime(event.start_date_time ?? '')
        setRegistrationDateTime(event.registration_date_time ?? '')
        setEndRegistrationDateTime(event.end_registration_date_time ?? '')
        setEndDateTime(event.end_date_time ?? '')
    }
  }, [event]);

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={'Events'} />

      {/* Main */}
      <Main active={'Events'} description={'Candidate College is an Education Platform that works to facilitate students in Indonesia.'}>
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[750px] h-full no-scrollbar scrollbar-hide">
          <Link href={'/events'} about={'Events'} title={'Events'} className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:pl-5 md:pr-[15px] py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-fit h-fit duration-700 transition-all text-4xl`}><ArrowBackIos color='inherit' fontSize='inherit' /></Link>
          {
            articleMenus?.map((menu, index) => (
              <Link href={menu.link} about={menu.name} title={menu.name} key={index} onClick={(e) => setActiveMenu(menu.name)} className={`${menu.name == activeMenu ? 'bg-primary text-white' : 'bg-secondary text-primary'} font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>{menu.name}</Link>
            ))
          }
        </div>

        <form method="POST" encType='multipart/form-data' onSubmit={handleEditEvent} className='flex flex-col gap-3 mt-5'>
            <Input 
                label="Name"
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={onChangeName}
                width="half"
            />

        <label htmlFor='category' className="block text-base text-gray-400">
            Category
        </label>
        <div className="w-[50%] focus:outline-none pe-10 rounded-xl border-gray-200 border-2 sm:text-base p-4">
        <select
            id='category'
            name='category'
            className="h-full rounded-md border-0 bg-transparent py-0 text-gray-400 focus:outline-none focus:ring-0 w-full sm:text-base"
            onChange={(e) => onChangeCategory(e)}
        >
            <option value="">Choose Category</option> {/* Add an empty value to represent the default (non-selected) option */}
            {categories.map((value: { id: number; name: string }, index: number) => (
            <option key={index} value={value.id} selected={categoryOld === value.name}>
                {value.name}
            </option>
            ))}
        </select>
        </div>

        <label htmlFor='type' className="block text-base text-gray-400">
            Type
        </label>
        <div className="w-[50%] focus:outline-none pe-10 rounded-xl border-gray-200 border-2 sm:text-base p-4">
            <select
                id='type'
                name='type'
                className="h-full rounded-md border-0 bg-transparent py-0 text-gray-400 focus:outline-none focus:ring-0 w-full sm:text-base"
                onChange={(e) => onChangeType(e)}
            >
                <option value="">Choose Type</option> {/* Add an empty value to represent the default (non-selected) option */}
                {types.map((value: { id: number; name: string }, index: number) => (
                <option key={index} value={value.id} selected={typeOld === value.name}>
                    {value.name}
                </option>
                ))}
            </select>
        </div>

            <Input 
                label="Link Registration"
                name="link_registration"
                type="text"
                placeholder="Link Registration"
                value={linkRegistration}
                onChange={onChangeLinkRegistration}
                width="half"
            />

<fieldset className="space-y-1 dark:text-gray-100">
          <label htmlFor="Cover" className="block text-base text-gray-400">
            Cover
          </label>
          <div className="relative w-[339px] h-[320px] rounded-xl object-cover">
            <button type='button' onClick={(e) => toggleIsEditCover()} className='bg-secondary rounded-lg flex items-center justify-center p-2 duration-700 transition-all absolute top-3 right-3'>
                <PenIcon size={'24'} color={'#1f1f1f'} />
            </button>
            <Image 
                width={0}
                height={0}
                alt={name}
                title={name}
                src={`https://resource.candidatecollegeind.com/storage/${oldCover}`}className={'w-[339px] h-[320px] rounded-xl object-cover'}
            />
          </div>
          {
            isEditCover ? <div className="flex">
            <input
              type="file"
              name="cover"
              id="Cover"
              className={`px-8 py-12 border-2 rounded-xl dark:border-gray-200 text-primary w-[50%]`}
              onChange={(e: any) => setCover(e.target.files[0])}
            />
          </div> : null
          }
        </fieldset>

        <fieldset className="space-y-1 dark:text-gray-100">
          <label htmlFor="Cover Landscape" className="block text-base text-gray-400">
            Cover Landscape
          </label>
          <div className="relative w-[50%] h-[340px] rounded-xl object-cover">
            <button type='button' onClick={(e) => toggleIsEditCoverLandscape()} className='bg-secondary rounded-lg flex items-center justify-center p-2 duration-700 transition-all absolute top-3 right-3'>
                <PenIcon size={'24'} color={'#1f1f1f'} />
            </button>
            <Image 
                width={0}
                height={0}
                alt={name}
                title={name}
                src={`https://resource.candidatecollegeind.com/storage/${oldCoverLandscape}`}className={'w-full h-[340px] rounded-xl object-cover'}
            />
          </div>
          {
            isEditCoverLandscape ? <div className="flex">
            <input
              type="file"
              name="cover_landscape"
              id="CoverLandscape"
              className={`px-8 py-12 border-2 rounded-xl dark:border-gray-200 text-primary w-[50%]`}
              onChange={(e: any) => setCoverLandscape(e.target.files[0])}
            />
          </div> : null
          }
        </fieldset>

            <Input 
                label="Hosted By"
                name="link_registration"
                type="text"
                placeholder="Hosted By"
                value={hostedBy}
                onChange={onChangeHostedBy}
                width="half"
            />

            <Input 
                label="Snippets"
                name="snippets"
                type="text"
                placeholder="Snippets"
                value={snippets}
                onChange={onChangeSnippets}
                width="half"
            />

            <label htmlFor="files" className="block text-base text-gray-400">Content</label>
            <Editor 
                id='article-text-editor'
                apiKey='ou6vupt6kkvaoyqctm0xfvx9q0dlgl78thc8frfo6afog1x5'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={body}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount', 'image code'
                    ],
                    images_upload_url: 'https://resource.candidatecollegeind.com/api/articles/image/upload',
                    file_picker_types: 'image',
                    automatic_uploads: true,
                    toolbar1: 'undo redo | blocks | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help | image code | insertfile undo redo',
                    toolbar2: 'table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader',
                    content_style: '@import url(\'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap\'); body { font-family:Plus Jakarta Sans,Arial,sans-serif; font-size:16px }'
                }}
                value={body}
                onEditorChange={onChangeBody}
            />

            <Input 
                label="Start Date Time"
                name="start_date_time"
                type="date"
                placeholder="Start Date Time"
                value={startDateTime}
                onChange={onChangeStartDateTime}
                width="half"
            />          

            <Input 
                label="Registration Date Time"
                name="registration_date_time"
                type="date"
                placeholder="Registration Date Time"
                value={registrationDateTime}
                onChange={onChangeRegistrationDateTime}
                width="half"
            />

            <Input 
                label="End Registration Date Time"
                name="end_registration_date_time"
                type="date"
                placeholder="End Registration Date Time"
                value={endRegistrationDateTime}
                onChange={onChangeEndRegistrationDateTime}
                width="half"
            />

            <Input 
                label="End Date Time"
                name="end_date_time"
                type="date"
                placeholder="End Date Time"
                value={endDateTime}
                onChange={onChangeEndDateTime}
                width="half"
            />
        
            <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>Update</button>
        </form>
      </Main>
    </main>
  )
}
