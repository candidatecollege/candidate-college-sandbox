import React, { useRef, useState } from 'react'
import { Input } from '@/components'
import { Editor } from '@tinymce/tinymce-react'

const FormArticle = () => {
  const editorRef = useRef<any>(null);

  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [readingTime, setReadingTime] = useState<any>(null)
  const [snippets, setSnippets] = useState<string>('')
  const [cover, setCover] = useState<any>(null)
  const [coverLandscape, setCoverLandscape] = useState<any>(null)
  const [body, setBody] = useState<string>('')

  const onChangeTitle = (e: any) => { setTitle(e.target.value) }
  const onChangeAuthor = (e: any) => { setAuthor(e.target.value) }
  const onChangeReadingTime = (e: any) => { setReadingTime(e.target.value) }
  const onChangeCategory = (e: any) => { setCategory(e.target.value) }
  const onChangeSnippets = (e: any) => { setSnippets(e.target.value) }
  const onChangeCover = (e: any) => { setCover(e.target.files[0]) }
  const onChangeCoverLandscape = (e: any) => { setCoverLandscape(editorRef.current?.files[0]) }

  const handleEditorChange = (content: any, editor: any) => {
    setBody(content);
  };

  const handleUploadArticle = (e: any) => {
    e.preventDefault()
    console.log([title, author, readingTime, category, snippets, cover, coverLandscape])
  }

  return (
    <form method="POST" encType='multipart/form-data' onSubmit={handleUploadArticle} className='flex flex-col gap-3 mt-5'>
        <Input 
            label="Title"
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={onChangeTitle}
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
                    { id: 2, name: 'Education', },
                    { id: 3, name: 'Technology', },
                    { id: 4, name: 'Students', },
                    { id: 5, name: 'Gen Z', },
                    { id: 6, name: 'Nowdays', },
                ]
            }
            width="full"
        />

        <Input 
            label="Author"
            name="author"
            type="text"
            placeholder="Author"
            value={author}
            onChange={onChangeAuthor}
            width="full"
        />

        <Input 
            label="Reading Time"
            name="duration"
            type="number"
            placeholder="Reading Time (m)"
            value={readingTime}
            onChange={onChangeReadingTime}
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
            onEditorChange={handleEditorChange}
        />
        
        <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>Upload</button>
    </form>
  )
}

export default FormArticle