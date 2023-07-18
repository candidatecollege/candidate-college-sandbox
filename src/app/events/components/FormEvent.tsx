import React, { useRef, useState } from 'react'
import { Input } from '@/components'
import { Editor } from '@tinymce/tinymce-react'

const FormEvent = () => {
  const editorRef = useRef<any>(null);

  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [linkRegistration, setLinkRegistration] = useState<string>('')
  const [cover, setCover] = useState<string>('')
  const [coverLandscape, setCoverLandscape] = useState<string>('')
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

  const handleUploadEvent = (e: any) => {
    e.preventDefault()
    console.log(name)
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
            width="full"
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
            width="full"
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
            width="full"
        />

        <Input 
            label="Link Registration"
            name="link_registration"
            type="text"
            placeholder="Link Registration"
            value={linkRegistration}
            onChange={onChangeLinkRegistration}
            width="full"
        />

        <Input 
            label="Cover"
            name="cover"
            type="file"
            placeholder="Cover"
            value={cover}
            onChange={onChangeCover}
            width="half"
        />

        <Input 
            label="Cover Landscape"
            name="cover_landscape"
            type="file"
            placeholder="Cover Landscape"
            value={coverLandscape}
            onChange={onChangeCoverLandscape}
            width="half"
        />

        <Input 
            label="Hosted By"
            name="link_registration"
            type="text"
            placeholder="Hosted By"
            value={hostedBy}
            onChange={onChangeHostedBy}
            width="full"
        />

        <Input 
            label="Snippets"
            name="snippets"
            type="text"
            placeholder="Snippets"
            value={snippets}
            onChange={onChangeSnippets}
            width="full"
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
            type="text"
            placeholder="Start Date Time"
            value={startDateTime}
            onChange={onChangeStartDateTime}
            width="full"
        />          

        <Input 
            label="Registration Date Time"
            name="registration_date_time"
            type="text"
            placeholder="Registration Date Time"
            value={registrationDateTime}
            onChange={onChangeRegistrationDateTime}
            width="full"
        />

        <Input 
            label="End Registration Date Time"
            name="end_registration_date_time"
            type="text"
            placeholder="End Registration Date Time"
            value={endRegistrationDateTime}
            onChange={onChangeEndRegistrationDateTime}
            width="full"
        />

        <Input 
            label="End Date Time"
            name="end_date_time"
            type="text"
            placeholder="End Date Time"
            value={endDateTime}
            onChange={onChangeEndDateTime}
            width="full"
        />

        <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>Upload</button>

    </form>
  )
}

export default FormEvent
