import React, { useRef, useState } from 'react'
import { Input } from '@/components'
import { Editor } from '@tinymce/tinymce-react'
import { getToken } from '@/utils/token';
import axios, { isAxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const FormEvent = () => {
  const editorRef = useRef<any>(null);
  const storedToken = getToken()
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [linkRegistration, setLinkRegistration] = useState<string>('')
  const [cover, setCover] = useState<any>(null)
  const [coverLandscape, setCoverLandscape] = useState<any>(null)
  const [body, setBody] = useState<string>('')
  const [hostedBy, setHostedBy] = useState<string>('')
  const [startDateTime, setStartDateTime] = useState<string>('')
  const [registrationDateTime, setRegistrationDateTime] = useState<string>('')
  const [endRegistrationDateTime, setEndRegistrationDateTime] = useState<string>('')
  const [endDateTime, setEndDateTime] = useState<string>('')
  const [snippets, setSnippets] = useState<string>('')

  const onChangeName = (e: any) => { setName(e.target.value) }
  const onChangeCategory = (e: any) => { setCategory(e.target.value) }
  const onChangeType = (e: any) => { setType(e.target.value) }
  const onChangeLinkRegistration = (e: any) => { setLinkRegistration(e.target.value) }
  const onChangeCover = (e: any) => { setCover(e.target.value) }
  const onChangeCoverLandscape = (e: any) => { setCoverLandscape(e.target.value) }
  const onChangeBody = (content: any, editor: any) => {
    setBody(content);
  }
  const onChangeHostedBy = (e: any) => { setHostedBy(e.target.value) }
  const onChangeSnippets = (e: any) => { setSnippets(e.target.value) }
  const onChangeStartDateTime = (e: any) => { setStartDateTime(e.target.value) }
  const onChangeRegistrationDateTime = (e: any) => { setRegistrationDateTime(e.target.value) }
  const onChangeEndRegistrationDateTime = (e: any) => { setEndRegistrationDateTime(e.target.value) }
  const onChangeEndDateTime = (e: any) => { setEndDateTime(e.target.value) }

  const handleUploadEvent = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('category_id', category)
    formData.append('type_id', type)
    formData.append('link_registration', linkRegistration)
    formData.append('cover', cover)
    formData.append('cover_landscape', coverLandscape)
    formData.append('hosted_by', hostedBy)
    formData.append('snippets', snippets)
    formData.append('body', body)
    formData.append('start_date_time', startDateTime)
    formData.append('registration_date_time', registrationDateTime)
    formData.append('end_registration_date_time', endRegistrationDateTime)
    formData.append('end_date_time', endDateTime)

    try {
        const response = await axios.post('/api/events', formData, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Successfully uploaded your new event!',
        });
  
        router.push('/events')
        console.log(response)
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response && error.response.status === 401) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              icon: 'error',
              title: 'Failed to upload event, unauthenticated!',
            })
          } else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              icon: 'error',
              title: 'Internal server error, please upload it later!',
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

  return (
    <form method="POST" encType='multipart/form-data' onSubmit={handleUploadEvent} className='flex flex-col gap-3 mt-5'>
        <Input 
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={onChangeName}
            width="half"
        />

        <Input 
            label="Category"
            name="category_id"
            type="select"
            placeholder="Category"
            value={category}
            onChange={onChangeCategory}
            isSelect={true}
            values={
                [
                    { id: 1, name: 'All', },
                    { id: 2, name: 'Edu Fair', },
                    { id: 3, name: 'Bootcamp', },
                    { id: 4, name: 'GTKCC', },
                    { id: 5, name: 'SNBT', },
                    { id: 6, name: 'LPDP', },
                ]
            }
            width="half"
        />

        <Input 
            label="Type"
            name="type_id"
            type="select"
            placeholder="Type"
            value={type}
            onChange={onChangeType}
            isSelect={true}
            values={
                [
                    { id: 1, name: 'Internal', },
                    { id: 2, name: 'Eksternal', },
                ]
            }
            width="half"
        />

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
          <div className="flex">
            <input
              type="file"
              name="cover"
              id="Cover"
              className={`px-8 py-12 border-2 rounded-xl dark:border-gray-200 text-primary w-[50%]`}
              onChange={(e: any) => setCover(e.target.files[0])}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-1 dark:text-gray-100">
          <label htmlFor="Cover Landscape" className="block text-base text-gray-400">
            Cover Landscape
          </label>
          <div className="flex">
            <input
              type="file"
              name="cover_landscape"
              id="CoverLandscape"
              className={`px-8 py-12 border-2 rounded-xl dark:border-gray-200 text-primary w-[50%]`}
              onChange={(e: any) => setCoverLandscape(e.target.files[0])}
            />
          </div>
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
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount', 'image code'
                ],
                images_upload_url: '/api/articles/image/upload',
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

        <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>Upload</button>

    </form>
  )
}

export default FormEvent
