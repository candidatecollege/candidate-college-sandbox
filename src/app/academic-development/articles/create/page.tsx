"use client";

import DropInputFile from "@/components/academic-development/Dropzone";
import Navbar from "@/components/superadmin/navbar";

import border from "@/styles/border.module.css";
import { useState } from "react";

export default function CreateArticlesPage() {
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <main className="">
      <Navbar title="Add Article" description="Add Your Article" />
      <section
        className={` ${border.border_add_article} mt-3 bg-[rgba(0,0,0,0.56)] p-8 rounded-[10px]`}
      >
        <div className="">
          <div className="grid grid-cols-2 gap-x-7 gap-y-4 ">
            <DropInputFile text="Upload Cover" />
            <DropInputFile text="Upload Landscape Cover" />
            <div className="relative">
              <label htmlFor="title">Title*</label>
              <div
                className={`${border.border_input_article} mt-1 rounded-[5px] before:bg-[radial-gradient(100%_100%_at_0%_0%,#ffde59_0%,#5eacdd_100%)]`}
              >
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="w-full bg-transparent outline-none p-3 relative"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
