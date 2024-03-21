"use client";

import Form from "@/components/academic-development/input/Form";
import Navbar from "@/components/superadmin/navbar";

import border from "@/styles/border.module.css";
import { getToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateArticlesPage() {
  const router = useRouter();
  const storedToken = getToken();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);
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
