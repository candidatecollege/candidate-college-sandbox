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
          <div className="grid grid-cols-2 gap-7 ">
            <DropInputFile text="Upload Cover" />
            <DropInputFile text="Upload Landscape Cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
