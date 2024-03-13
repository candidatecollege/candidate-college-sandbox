"use client";
import Navbar from "@/components/superadmin/navbar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  BarOptions,
  Legend,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  PluginChartOptions,
  Plugin,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import border from "@/styles/border.module.css";

import {
  BookmarkIcon,
  CalendarIcon,
  ClockIcon,
  DiagramIcon,
  EditIcon,
  Trash2Icon,
} from "@/components/icons";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";

const getWeekDays = (day: number) => {
  return Array.from({ length: day }, (_, i) =>
    format(subDays(new Date(), i), "d MMM")
  ).reverse();
};

export default function PageArticlesSuperAdmin() {
  const [articles, setArticles] = useState([]);
  const [day, setDay] = useState<string>("3");
  const [categoryArticles, setCategoryArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const statisticValue = [
    { value: "3", title: "3 days" },
    { value: "7", title: "7 days" },
    { value: "all", title: "all days" },
  ];

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get("/api/articles?count=3");

      setArticles(data.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchCategoryArticles = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get("/api/article/categories");
      const category: any[] = data.data.data;
      const filterCategory = category.filter((val, _) => {
        return val.name !== "All";
      });
      const sortedArray = filterCategory.sort(
        (a, b) => a.articles.length - b.articles.length
      );
      setCategoryArticles(sortedArray.slice(0, 8).reverse());
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  //
  const parseDate = (date: string) => {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const d = new Date(date).getDate();
    const m = monthNames[new Date(date).getMonth()];
    const y = new Date(date).getFullYear();
    return `${d} ${m} ${y}`;
  };

  useEffect(() => {
    fetchArticles();
    fetchCategoryArticles();
  }, []);

  ChartJS.register(BarElement, Tooltip, Legend, LinearScale, CategoryScale);

  const dataBar = {
    labels:
      day == "all"
        ? [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]
        : day == "3"
        ? getWeekDays(3)
        : getWeekDays(7),
    datasets: [
      {
        data:
          day == "all"
            ? [32, 12, 4, 6, 12, 4, 63]
            : day == "3"
            ? [12, 4, 63]
            : [32, 12, 4, 6, 12, 4, 63],
        barThickness: 35,
        borderRadius: 50,
        backgroundColor: "#FFDE59",
        label: "Total Count",
      },
    ],
  } as ChartData<"bar">;
  return (
    <main>
      <Navbar
        title="Article"
        description="Welcome To Your Article Dashboard"
        placeholder="Search for anything"
      />
      <div className="flex gap-6 h-fit mt-4">
        <section
          className={`${border.border_graph} pb-16 relative  w-1/2 rounded-[10px]  p-4 bg-[#0000008F]`}
        >
          <div className="flex items-center relative justify-between">
            <div>
              <h2 className="text-[20px] font-semibold leading-[26px]">
                Statistics last
              </h2>
              <h3 className="text-[16px] text-[#FFFFFF8F]">Document</h3>
            </div>
            <select
              className="bg-secondary    p-[6px] rounded-[10px]  font-medium text-[15px] text-primary"
              name=""
              id=""
              onChange={(e) => setDay(e.target.value)}
            >
              {statisticValue.map((value, index) => {
                return (
                  <option
                    key={index}
                    className={`hover:bg-primary  checked:bg-primary checked:text-white`}
                    value={value.value}
                  >
                    {value.title}
                  </option>
                );
              })}
            </select>
          </div>

          <Bar
            options={{
              maintainAspectRatio: false,
              // scales: {
              //   x: {
              //     min: 0,
              //     max: 7,
              //   },
              // },
              plugins: { legend: { display: false } },
              responsive: true,
            }}
            className="absolute"
            data={dataBar}
          />
        </section>
        <section className="w-1/2">
          <h2 className="font-semibold flex items-center gap-3 text-[22px]">
            Top Categories <DiagramIcon />
          </h2>
          <div
            style={{
              gridTemplateRows: `repeat(${Math.ceil(
                isLoading ? 3 / 2 : categoryArticles.length / 2
              )}, minmax(0, 1fr))`,
            }}
            className="grid  grid-flow-col grid-cols-2   gap-x-7 gap-y-2 mt-4"
          >
            {isLoading
              ? new Array(4).fill(0).map((_, index) => {
                  return (
                    <article
                      key={index}
                      className={`flex gap-3 bg-[#0000008F] rounded-[10px] p-2`}
                    >
                      <div className="w-[20%] h-[40px] rounded-[12px] bg-slate-700 animate-skeleton"></div>
                      <div className="w-full flex flex-col gap-2 justify-center">
                        <div className="bg-slate-700 h-2 animate-skeleton"></div>
                        <div className="bg-slate-700 h-2 animate-skeleton"></div>
                      </div>
                    </article>
                  );
                })
              : categoryArticles.map((value, index) => {
                  return (
                    <article
                      key={index}
                      className={`${border.border_graph} p-2  bg-[#0000008F] rounded-[10px]  flex gap-3 items-center`}
                    >
                      <Image
                        className="rounded-[12px] w-[20%] h-[40px] object-cover"
                        src={`/uploads/${value.articles?.[0]?.cover}`}
                        width={100}
                        height={100}
                        alt="Article image"
                      />
                      <div>
                        <h3 className="text-[14px]  font-medium">
                          {value.name}
                        </h3>
                        <h4 className="text-[10px] ">
                          {value.articles.length} Articles
                        </h4>
                      </div>
                    </article>
                  );
                })}
          </div>
        </section>
      </div>
      <section className="mt-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold flex items-center gap-3 text-[22px]">
            Article Published <BookmarkIcon />
          </h2>
          <h3 className="text-[14px] text-[#FFFFFF8F]">View all</h3>
        </div>
        <div className="flex gap-4 mt-2">
          {isLoading
            ? new Array(3).fill(0).map((_, index) => {
                return (
                  <article
                    key={index}
                    className={`w-full bg-[#0000008F] p-3 rounded-[10px] `}
                  >
                    <div className="relative overflow-hidden rounded-[10px]">
                      <div className="w-full h-36 bg-slate-700"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="w-20 h-3 bg-slate-700 rounded-[10px]"></div>
                      <div className="w-20 h-3 bg-slate-700 rounded-[10px]"></div>
                    </div>
                    <div className="w-full h-8 mt-2 bg-slate-700 rounded-[10px]"></div>
                    <div className="w-full h-2 mt-2 bg-slate-700 rounded-[10px]"></div>
                    <div className="w-full h-2 mt-2 bg-slate-700 rounded-[10px]"></div>
                    <div className="w-full h-2 mt-2 bg-slate-700 rounded-[10px]"></div>
                  </article>
                );
              })
            : articles?.map((value: any, index) => {
                return (
                  <article
                    key={index}
                    className={`${border.border_graph} w-full bg-[#0000008F] p-3 rounded-[10px] `}
                  >
                    <div className="relative overflow-hidden rounded-[10px]">
                      <Image
                        src={`/uploads/${value.cover_landscape}`}
                        className="w-full h-full"
                        width={100}
                        height={100}
                        alt="Image Article"
                      />
                      <div className="absolute   flex gap-2 top-2 right-2">
                        <button className="bg-[#FFDE598F] group hover:bg-secondary hover:bg-  p-[5px] rounded-[10px]">
                          <EditIcon />
                        </button>
                        <button className="bg-[#DC26268F] group hover:bg-[#dc2626] p-[5px] rounded-[10px]">
                          <Trash2Icon />
                        </button>
                      </div>
                      <button className="bg-secondary text-[10px] px-2 py-1 text-primary rounded-[10px] bottom-2 left-2 absolute">
                        {value.category}
                      </button>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-[#ffffff8f]">
                      <h5 className="flex gap-1 items-center">
                        <CalendarIcon /> {parseDate(value.created_at)}
                      </h5>
                      <h5 className="flex gap-1 items-center">
                        <ClockIcon /> {value.duration} min read
                      </h5>
                    </div>
                    <h4 className="font-bold leading-[22px] mt-2  text-[18px]">
                      {value.title}
                    </h4>
                    <p className="text-[12px] mt-2 leading-[16px]">
                      {value.snippets}
                    </p>
                  </article>
                );
              })}
        </div>
      </section>
    </main>
  );
}
