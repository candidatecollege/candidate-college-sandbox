import DropInputFile from "@/components/academic-development/input/Dropzone";
import InputMain from "@/components/academic-development/input/InputMain";
import InputSelect from "@/components/academic-development/input/InputSelect";
import InputTextArea from "@/components/academic-development/input/InputTextArea";

import { getToken } from "@/utils/token";
import { Editor } from "@tinymce/tinymce-react";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Form() {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const storedToken = getToken();
  const [cover, setCover] = useState<Blob | string>("");
  const [landscapeCover, setLandscapeCover] = useState<Blob | string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [snippets, setSnippets] = useState<string>("");
  const [readingTime, setReadingTime] = useState<string>("");

  const [body, setBody] = useState<string>("");

  const handleEditorChange = (content: any, editor: any) => {
    setBody(content);
  };

  const checkForm = () => {
    if (!cover || !landscapeCover || category === "" || body === "") {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        icon: "error",
        title: "Form is required",
      });

      return;
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkForm();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", category);
    formData.append("author", author);
    formData.append("cover_landscape", landscapeCover);
    formData.append("cover", cover);
    formData.append("body", body);
    formData.append("duration", readingTime);
    formData.append("snippets", snippets);

    try {
      const response = await axios.post("/api/articles", formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        icon: "success",
        title: "Successfully uploaded your new article!",
      });

      //   router.push("/articles");
    } catch (error) {
      console.error("Error posting data: ", error);
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Failed to upload article, unauthenticated!",
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Internal server error, please upload it later!",
        });

        // router.push("/articles");
      }
    }

    setCover("");
    setLandscapeCover("");
    setTitle("");
    setAuthor("");
    setBody("");
    setCategory("");
    setReadingTime("");
    setSnippets("");
  };

  const handleImageUpload = async (file: any, success: any, failure: any) => {
    const formData = new FormData();

    formData.append("image", file);

    try {
      // Replace 'YOUR_IMAGE_UPLOAD_API_URL' with your API endpoint for image uploads
      const response = await axios.post(
        "/api/articles/image/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      const imageUrl = response.data.url;
      success(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      //   failure("Image upload failed");
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmitForm}>
      <div className="grid grid-cols-2 gap-x-7 gap-y-4 ">
        <DropInputFile value={cover} setValue={setCover} text="Upload Cover" />
        <DropInputFile
          value={landscapeCover}
          setValue={setLandscapeCover}
          text="Upload Landscape Cover"
        />
        <InputMain value={title} setValue={setTitle} name="Title" />
        <InputSelect value={category} setValue={setCategory} />
        <InputMain value={author} setValue={setAuthor} name="Author" />
        <InputMain
          value={readingTime}
          setValue={setReadingTime}
          name="Reading Time"
        />
      </div>
      <InputTextArea
        value={snippets}
        setValue={setSnippets}
        className="mt-4"
        name="Snippets"
      />
      <div className="mt-4">
        <label htmlFor="content" className="mb-1 block">
          Content*
        </label>
        <Editor
          id="content"
          apiKey="ou6vupt6kkvaoyqctm0xfvx9q0dlgl78thc8frfo6afog1x5"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
              "image code",
            ],
            images_upload_url: "/api/articles/image/upload",

            file_picker_types: "image",

            file_picker_callback: handleImageUpload,
            automatic_uploads: true,
            toolbar1:
              "undo redo | blocks | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | image code | insertfile undo redo",
            toolbar2:
              "table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader",
            content_style:
              "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); body { font-family:Plus Jakarta Sans,Arial,sans-serif; font-size:16px }",
          }}
          value={body}
          onEditorChange={handleEditorChange}
        />
      </div>
      <div className="flex gap-3 mt-4  justify-end">
        <button className="bg-[rgba(255,255,255,0.56)] hover:opacity-70 transition-opacity relative font-semibold text-sm p-4 w-[25%] text-center rounded-[30px]">
          Cancel
        </button>
        <button className="bg-secondary text-sm p-4 w-[25%] text-primary hover:opacity-70 transition-opacity relative font-semibold text-center rounded-[30px]">
          Upload
        </button>
      </div>
    </form>
  );
}
