import React, { useRef, useState } from 'react'
import { Input } from '@/components'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios';
import Swal from 'sweetalert2'
import '../../../styles/styles.css'
import { useRouter } from 'next/navigation';

const FormArticle: React.FC<any> = ({ categories }) => {
  const editorRef = useRef<any>(null);
  const router    = useRouter()

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

  const handleEditorChange = (content: any, editor: any) => {
    setBody(content);
  };

  const handleUploadArticle = async (e: any) => {
    e.preventDefault()
    console.log([title, author, readingTime, category, snippets, cover, coverLandscape, body])

    const formData = new FormData()
    formData.append('title', title)
    formData.append('category_id', category)
    formData.append('author', author)
    formData.append('duration', readingTime)
    formData.append('snippets', snippets)
    formData.append('cover', cover)
    formData.append('cover_landscape', coverLandscape)
    formData.append('body', body)

    try {
        const response = await axios.post('https://resource.candidatecollegeind.com/api/articles', formData, {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc291cmNlLmNhbmRpZGF0ZWNvbGxlZ2VpbmQuY29tL2FwaS9sb2dpbiIsImlhdCI6MTY4OTcwMTcwMywiZXhwIjoxNjg5NzA1MzAzLCJuYmYiOjE2ODk3MDE3MDMsImp0aSI6IkJTbHZmRnFaVnhmbmh6SUMiLCJzdWIiOiIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.iI-ea8DPla6JtcOGWzfkA7E59paaf0ejkRUy8ePED7w`,
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

            router.push('/articles')
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

    setTitle('')
    setAuthor('')
    setCategory('')
    setReadingTime('')
    setSnippets('')
    setCover(null)
    setCoverLandscape(null)
    setBody('')
  }

  const handleImageUpload = async (file: any, success: any, failure: any) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Replace 'YOUR_IMAGE_UPLOAD_API_URL' with your API endpoint for image uploads
      const response = await axios.post('https://resource.candidatecollegeind.com/api/articles/image/upload', formData, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jlc291cmNlLmNhbmRpZGF0ZWNvbGxlZ2VpbmQuY29tL2FwaS9sb2dpbiIsImlhdCI6MTY4OTY4Mzc5OCwiZXhwIjoxNjg5Njg3Mzk4LCJuYmYiOjE2ODk2ODM3OTgsImp0aSI6IlRNeE9wM1VNYnVOUm9SWlIiLCJzdWIiOiIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.s4lIGkByS2n7PAmt_2Y-NQPPdbQ_5MThV43OvqGQnYk`,
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

  return (
    <form method="POST" encType='multipart/form-data' onSubmit={handleUploadArticle} className='flex flex-col gap-3 mt-5'>
        <Input 
            label="Title"
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={onChangeTitle}
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
            values={categories}
            width="half"
        />

        <Input 
            label="Author"
            name="author"
            type="text"
            placeholder="Author"
            value={author}
            onChange={onChangeAuthor}
            width="half"
        />

        <Input 
            label="Reading Time"
            name="duration"
            type="number"
            placeholder="Reading Time (m)"
            value={readingTime}
            onChange={onChangeReadingTime}
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
                file_picker_callback: handleImageUpload,
                automatic_uploads: true,
                toolbar1: 'undo redo | blocks | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help | image code | insertfile undo redo',
                toolbar2: 'table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader',
                content_style: '@import url(\'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap\'); body { font-family:Plus Jakarta Sans,Arial,sans-serif; font-size:16px }'
            }}
            value={body}
            onEditorChange={handleEditorChange}
        />
        
        <button about="Submit" title="Submit" type='submit' className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}>Upload</button>
    </form>
  )
}

export default FormArticle