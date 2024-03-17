"use client";

import Form from "@/components/academic-development/input/Form";
import Navbar from "@/components/superadmin/navbar";

import border from "@/styles/border.module.css";

export default function CreateArticlesPage() {
  return (
    <main className="">
      <Navbar title="Add Article" description="Add Your Article" />
      <section
        className={` ${border.border_add_article} mt-3 bg-[rgba(0,0,0,0.56)] p-8 rounded-[10px]`}
      >
        <Form />
      </section>
    </main>
  );
}
