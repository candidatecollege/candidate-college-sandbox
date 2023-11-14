"use client";
import React, { useEffect, useState } from "react";
import { Main, Sidebar } from "@/components";
import Link from "next/link";
import { articleMenus } from "@/data/staticData";
import { FormArticle } from "../components";
import { ArrowBackIos } from "@mui/icons-material";
import axios from "axios";
import { getToken } from "@/utils/token";
import { useRouter } from "next/navigation";

export default function Create() {
  const [activeMenu, setActiveMenu] = useState<string>("Create Article");
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  const storedToken = getToken();

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
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

  useEffect(() => {
    fetchCategories();
  }, [categories]);

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

        <FormArticle categories={categories} />
      </Main>
    </main>
  );
}
