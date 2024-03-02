"use client";
import {
  BookIcon,
  BookmarkIcon,
  BriefcaseIcon,
  PeopleIcon,
  StickNoteIcon,
} from "@/components/icons";
import moment from "moment";
import Progress from "@/components/superadmin/Progress";
import Navbar from "@/components/superadmin/navbar";
import border from "@/styles/border.module.css";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ChartData,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
} from "chart.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const getWeekDays = (day: number) => {
  let result = [];
  for (let i = 0; i < day; i++) {
    let tujuhHariSebelumnya = moment().subtract(i, "days"); // menghitung 7 hari sebelum sekarang

    result.push(tujuhHariSebelumnya.format("D MMM"));
  }

  return result.reverse();
};

export default function DashboardPage() {
  const [day, setDay] = useState<string>("3");
  const [members, setMembers] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMember = async () => {
    setIsLoading(true);
    const data = await axios.get("/api/members?count=8");
    setMembers(data.data.data.reverse().slice(0, 8));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMember();
  }, []);

  getWeekDays(parseInt(day));
  ChartJS.register(
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale
  );

  const statisticValue = [
    { value: "3", title: "3 days" },
    { value: "7", title: "7 days" },
    { value: "all", title: "all days" },
  ];

  const dataDoughnut = {
    labels: ["Ongoing Events", "Held", "Upcoming Events"],
    datasets: [
      {
        data: [4, 12, 43],

        backgroundColor: ["#5EACDD", "#FFDE59", "#1B4E6B"],
      },
    ],
  } as ChartData<"doughnut">;

  const dataCard = [
    {
      title: "Published article",
      icon: <BookIcon />,
      percent: "15%",
      count: 250,
    },
    {
      title: "All events",
      icon: <StickNoteIcon stroke="#1B4E6B" />,
      percent: "40%",
      count: 300,
    },
    {
      title: "Total divisions",
      icon: <BriefcaseIcon stroke="#1B4E6B" />,
      percent: "33%",
      count: 14,
    },
    {
      title: "Total Members",
      icon: <PeopleIcon stroke="#1B4E6B" />,
      percent: "5%",
      count: 130,
    },
  ];

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
        title="Dashboard"
        description="Welcome To Your Dashboard"
        placeholder="Search for anything"
      />
      <div className="flex flex-wrap gap-6 h-fit mt-4">
        {dataCard.map((value, index) => {
          return (
            <div
              key={index}
              className={`${border.border_graph} p-4 rounded-[10px] flex-1  bg-[#0000008F]`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-medium">{value.title}</h2>
                <button className="bg-secondary rounded-[15px] p-[10px]">
                  {value.icon}
                </button>
              </div>
              <h3 className="text-[40px] font-semibold">{value.count}</h3>
              <Progress percent={value.percent} />
              <div className="flex items-center mt-4 justify-between">
                <h4 className="text-[8px]">+300 readers in 7 days</h4>
                <button className="bg-[#5EACDD] text-[14px] rounded-[15px] px-2 text-white">
                  {value.percent}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 gap-5 flex flex-wrap">
        <div className="flex-1">
          <section
            className={`${border.border_graph} w-full pb-16 relative min-h-[300px]  rounded-[10px]  p-4 bg-[#0000008F]`}
          >
            <div className="flex items-center relative justify-between">
              <div>
                <h2 className="text-[20px] font-semibold leading-[26px]">
                  Article statistics last
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
          <section
            className={`${border.border_graph}  p-4 mt-5 bg-[#0000008F] rounded-[10px]`}
          >
            <div>
              <h2 className="text-[20px] font-semibold leading-[26px]">
                Events statistics last 1 month
              </h2>
              <h3 className="text-[16px] text-[#FFFFFF8F]">Document</h3>
            </div>
            <div className="flex py-5 px-8">
              <ul className="flex  flex-1  flex-col gap-8">
                <li className="flex gap-2 text-[14px] font-medium items-center">
                  <div className="rounded-[5px] w-[14px] !aspect-square h-[14px] bg-[#5EACDD]" />
                  Ongoing Events
                </li>
                <li className="flex gap-2 text-[14px] font-medium items-center">
                  <div className="rounded-[5px] w-[14px] !aspect-square h-[14px] bg-secondary" />
                  Held
                </li>
                <li className="flex gap-2 text-[14px] font-medium items-center">
                  <div className="rounded-[5px] w-[14px] !aspect-square h-[14px] bg-primary" />
                  Upcoming Events
                </li>
              </ul>
              <div className="w-1/2 relative">
                <Doughnut
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  data={dataDoughnut}
                />
              </div>
            </div>
          </section>
        </div>
        <div
          className={`${border.border_graph} !h-fit  flex-1 bg-[#0000008F] rounded-[10px]`}
        >
          <h2 className="text-[20px] p-4  font-semibold leading-[26px]">
            New Members
          </h2>
          <div className="">
            <div className=" flex bg-secondary w-full gap-3  px-6 py-2">
              <div className="font-semibold flex-1 text-[14px]  text-primary ">
                NAME
              </div>
              <div className="font-semibold flex-1 text-[14px]  text-primary">
                DATE EMPLOYED
              </div>
              <div className="font-semibold flex-1 text-[14px]  text-primary">
                DIVISION
              </div>
            </div>
            <div className="px-4 py-2 flex flex-col gap-2">
              {isLoading
                ? new Array(4).fill(0).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex h-10 py-2 px-2  gap-2 items-center rounded-[10px]"
                      >
                        <div className="w-[30px] h-[30px] rounded-full bg-slate-700"></div>
                        <div className="w-full">
                          <div className=" w-full h-2  bg-slate-700"></div>
                          <div className=" w-full h-2  bg-slate-700 mt-1"></div>
                        </div>
                      </div>
                    );
                  })
                : members?.map((val, index) => {
                    return (
                      <div
                        key={index}
                        className="flex group hover:text-[#fff] gap-7 transition-all text-[#FFFFFF8F] rounded-[10px] py-2 px-2 hover:bg-[#1B4E6B1A] relative w-full  "
                      >
                        <div className="font-medium flex  gap-3 flex-1 items-center text-[14px]">
                          <Image
                            width={100}
                            height={100}
                            alt="Profile"
                            src={`/uploads/${val.image}`}
                            className="rounded-full object-cover   group-hover:opacity-100 transition-all opacity-60 aspect-square h-[30px] w-[30px]"
                          />
                          <div className="">{val.name}</div>
                        </div>
                        <div className="font-medium flex-1 text-[14px] ">
                          <div className="">January 1, 2024 </div>
                        </div>
                        <div className="font-medium flex-1 text-[14px] ">
                          <div className=" ">
                            {val.position} {val.division}
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
