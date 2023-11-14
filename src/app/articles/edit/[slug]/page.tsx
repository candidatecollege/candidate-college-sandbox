"use client";
import React, { useEffect, useState, useRef } from "react";
import { Input, Main, Sidebar } from "@/components";
import Link from "next/link";
import { articleMenus } from "@/data/staticData";
import { FormArticle } from "../../components";
import { ArrowBackIos } from "@mui/icons-material";
import axios, { isAxiosError } from "axios";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { PenIcon } from "@/components/icons";
import { getToken } from "@/utils/token";
import { setCategoryId } from "@/utils/categoy";

export default function Edit() {
  const slug = usePathname().slice(15);
  const [activeMenu, setActiveMenu] = useState<string>("Edit Article");
  const [categories, setCategories] = useState<any[]>([]);
  const [article, setArticle] = useState<any>(null);
  const router = useRouter();
  const storedToken = getToken();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(
        `http://resource-candidatecollege.infinityfreeapp.com/api/articles/${slug}`
      );

      setArticle(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const editorRef = useRef<any>(null);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categoryOld, setCategoryOld] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [readingTime, setReadingTime] = useState<any>(null);
  const [snippets, setSnippets] = useState<string>("");
  const [cover, setCover] = useState<any>(null);
  const [coverLandscape, setCoverLandscape] = useState<any>(null);
  const [body, setBody] = useState<string>("");

  const [oldCover, setOldCover] = useState<string>("");
  const [oldCoverLandscape, setOldCoverLandscape] = useState<string>("");

  const [isEditCover, setIsEditCover] = useState<boolean>(false);
  const [isEditCoverLandscape, setIsEditCoverLandscape] =
    useState<boolean>(false);

  const toggleIsEditCover = () => {
    setIsEditCover(!isEditCover);
  };

  const toggleIsEditCoverLandscape = () => {
    setIsEditCoverLandscape(!isEditCoverLandscape);
  };

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const onChangeAuthor = (e: any) => {
    setAuthor(e.target.value);
  };
  const onChangeReadingTime = (e: any) => {
    setReadingTime(e.target.value);
  };
  const onChangeCategory = (e: any) => {
    setCategory(e.target.value);
  };
  const onChangeSnippets = (e: any) => {
    setSnippets(e.target.value);
  };

  const handleEditorChange = (content: any, editor: any) => {
    setBody(content);
  };

  const handleUpdateArticle = async (e: any) => {
    e.preventDefault();
    console.log([
      title,
      author,
      readingTime,
      category,
      snippets,
      cover,
      coverLandscape,
      body,
    ]);

    const formData = new FormData();
    formData.append("title", title);

    const oldCategorySelected = setCategoryId(categoryOld, categories);

    if (category != "") {
      formData.append("category_id", category);
    } else {
      formData.append("category_id", oldCategorySelected.toString());
    }

    formData.append("author", author);
    formData.append("duration", readingTime);
    formData.append("snippets", snippets);
    if (cover != null) {
      formData.append("cover", cover);
    }

    if (coverLandscape != null) {
      formData.append("cover_landscape", coverLandscape);
    }

    formData.append("body", body);

    console.log(formData);

    try {
      const response = await axios.post(
        `http://resource-candidatecollege.infinityfreeapp.com/api/articles/${slug}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "mulipart/form-data",
          },
        }
      );
      console.log(response);

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        icon: "success",
        title: "Successfully edited your article!",
      });

      router.push("/articles");
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
          title: "Failed to edit article, unauthenticated!",
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Internal server error, please edit it later!",
        });

        router.push("/articles");
      }
    }

    setTitle("");
    setAuthor("");
    setCategory("");
    setReadingTime("");
    setSnippets("");
    setCover(null);
    setCoverLandscape(null);
    setBody("");
  };

  const handleImageUpload = async (file: any, success: any, failure: any) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Replace 'YOUR_IMAGE_UPLOAD_API_URL' with your API endpoint for image uploads
      const response = await axios.post(
        "http://resource-candidatecollege.infinityfreeapp.com/api/articles/image/upload",
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
      failure("Image upload failed");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://resource-candidatecollege.infinityfreeapp.com/api/article/categories"
      );

      setCategories(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticle();
  }, []);

  useEffect(() => {
    // Only set the state values if the article data is available
    if (article) {
      setTitle(article?.title ?? ""); // Use optional chaining and nullish coalescing operator (??) to safely set values
      setAuthor(article?.author ?? "");
      setCategory("");
      setCategoryOld(article?.category ?? "");
      setReadingTime(article?.duration ?? null);
      setSnippets(article?.snippets ?? "");
      // Set cover and coverLandscape to null by default since we're handling them separately in the file input fields
      setCover(null);
      setCoverLandscape(null);
      setOldCover(article?.cover ?? "");
      setOldCoverLandscape(article?.cover_landscape ?? "");
      setBody(article?.body ?? "");
    }
  }, [article]);

  return (
    <main className="flex w-full h-screen shadow-lg rounded-3xl bg-white text-primary">
      {/* Sidebar */}
      <Sidebar active={"Articles"} />

      {/* Main */}
      <Main
        active={"Articles"}
        description={
          "Candidate College is an Education Platform that works to facilitate students in Indonesia."
        }
      >
        <div className="flex flex-row gap-4 mt-10 mb-5 overflow-x-auto overflow-y-hidden w-[750px] h-full no-scrollbar scrollbar-hide">
          <Link
            href={"/articles"}
            about={"Articles"}
            title={"Articles"}
            className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:pl-5 md:pr-[15px] py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-fit h-fit duration-700 transition-all text-4xl`}
          >
            <ArrowBackIos color="inherit" fontSize="inherit" />
          </Link>
          {articleMenus?.map((menu, index) => (
            <Link
              href={menu.link}
              about={menu.name}
              title={menu.name}
              key={index}
              onClick={(e) => setActiveMenu(menu.name)}
              className={`${
                menu.name == activeMenu
                  ? "bg-primary text-white"
                  : "bg-secondary text-primary"
              } font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}
            >
              {menu.name}
            </Link>
          ))}
        </div>

        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleUpdateArticle}
          className="flex flex-col gap-3 mt-5"
        >
          <Input
            label="Title"
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={onChangeTitle}
            width="half"
          />

          <div className="w-[50%] focus:outline-none pe-10 rounded-xl border-gray-200 border-2 sm:text-base p-4">
            <select
              id="category"
              name="category"
              className="h-full rounded-md border-0 bg-transparent py-0 text-gray-400 focus:outline-none focus:ring-0 w-full sm:text-base"
              onChange={(e) => onChangeCategory(e)}
            >
              <option value="">Choose Category</option>{" "}
              {/* Add an empty value to represent the default (non-selected) option */}
              {categories.map(
                (value: { id: number; name: string }, index: number) => (
                  <option
                    key={index}
                    value={value.id}
                    selected={categoryOld === value.name}
                  >
                    {value.name}
                  </option>
                )
              )}
            </select>
          </div>

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
            <div className="relative w-[339px] h-[320px] rounded-xl object-cover">
              <button
                type="button"
                onClick={(e) => toggleIsEditCover()}
                className="bg-secondary rounded-lg flex items-center justify-center p-2 duration-700 transition-all absolute top-3 right-3"
              >
                <PenIcon size={"24"} color={"#1f1f1f"} />
              </button>
              <Image
                width={0}
                height={0}
                alt={title}
                title={title}
                src={`http://resource-candidatecollege.infinityfreeapp.com/storage/${oldCover}`}
                className={"w-[339px] h-[320px] rounded-xl object-cover"}
              />
            </div>
            {isEditCover ? (
              <div className="flex">
                <input
                  type="file"
                  name="cover"
                  id="Cover"
                  className={`px-8 py-12 border-2 rounded-xl dark:border-gray-200 text-primary w-[50%]`}
                  onChange={(e: any) => setCover(e.target.files[0])}
                />
              </div>
            ) : null}
          </fieldset>

          <fieldset className="space-y-1 dark:text-gray-100">
            <label
              htmlFor="Cover Landscape"
              className="block text-base text-gray-400"
            >
              Cover Landscape
            </label>
            <div className="relative w-[50%] h-[340px] rounded-xl object-cover">
              <button
                type="button"
                onClick={(e) => toggleIsEditCoverLandscape()}
                className="bg-secondary rounded-lg flex items-center justify-center p-2 duration-700 transition-all absolute top-3 right-3"
              >
                <PenIcon size={"24"} color={"#1f1f1f"} />
              </button>
              <Image
                width={0}
                height={0}
                alt={title}
                title={title}
                src={`http://resource-candidatecollege.infinityfreeapp.com/storage/${oldCoverLandscape}`}
                className={"w-full h-[340px] rounded-xl object-cover"}
              />
            </div>
            {isEditCoverLandscape ? (
              <div className="flex">
                <input
                  type="file"
                  name="cover_landscape"
                  id="CoverLandscape"
                  className={`px-8 py-12 border-2 rounded-xl dark:border-gray-200 text-primary w-[50%]`}
                  onChange={(e: any) => setCoverLandscape(e.target.files[0])}
                />
              </div>
            ) : null}
          </fieldset>

          <label htmlFor="files" className="block text-base text-gray-400">
            Content
          </label>
          <Editor
            id="article-text-editor"
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
              images_upload_url:
                "http://resource-candidatecollege.infinityfreeapp.com/api/articles/image/upload",
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

          <button
            about="Submit"
            title="Submit"
            type="submit"
            className={`bg-secondary text-primary font-medium text-sm md:text-base rounded-full px-2 md:px-5 py-3 text-center cursor-pointer mt-6 hover:bg-primary hover:text-white md:mt-0 w-full duration-700 transition-all`}
          >
            Update
          </button>
        </form>
      </Main>
    </main>
  );
}
