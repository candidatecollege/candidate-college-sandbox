"use client";
import { RankingIcon, SortIcon } from "@/components/icons";
import Navbar from "@/components/superadmin/navbar";
import border from "@/styles/border.module.css";
import axios from "axios";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";

interface Member {
  id: string;
  name: string;
  image: string;
  position: string;
  division: string;
  instagram: string;
  linkedin: string;
}

export default function PageSuperAdminMember() {
  const [members, setMembers] = useState<Member[]>();
  const [batch, setBatch] = useState<string>();
  const [drop, setDrop] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchMember = async () => {
    setIsLoading(true);
    const data = await axios.get("/api/members?count=8");
    console.log(data.data.data);
    setMembers(data.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMember();
  }, []);
  const options = ["Batch 1", "Batch 2", "Batch 3"];

  return (
    <main>
      <Navbar
        title="Member"
        description="Welcome To Your Member Dashboard"
        placeholder="Search for anything"
      />
      <div>
        <div
          className={`${border.border_member_top} py-4 px-6 bg-[#0000008F] rounded-t-[10px] h-fit mt-4`}
        >
          <div className="flex justify-between">
            <div className="text-[12px] items-center relative flex gap-1">
              Show
              <select
                className="border-white  border rounded-[5px] bg-transparent"
                name=""
                id=""
              >
                <option className="bg-secondary  text-primary" value="">
                  10
                </option>
                <option className="bg-secondary  text-primary" value="">
                  20
                </option>
              </select>
              Entries
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-[12px] border  rounded-[5px] px-2 py-1">
                <SortIcon /> Filter
              </button>
              <div className="relative text-[12px]">
                <button
                  onClick={() => setDrop((v) => !v)}
                  className="flex items-center gap-2 border  rounded-[5px] px-2 py-1"
                >
                  <div className="flex items-center gap-1">
                    <RankingIcon /> {batch ? batch : "Batch"}
                  </div>
                  <IoIosArrowDown
                    className={`${drop && "rotate-180"} transition-all`}
                  />
                </button>
                <div
                  className={`absolute  z-10 mt-2 duration-300  transition-all rounded-[5px]  ${
                    drop
                      ? "opacity-100  cursor-pointer"
                      : "opacity-0 cursor-default"
                  }  overflow-hidden inset-x-0`}
                >
                  {options.map((value, index) => {
                    return (
                      <div
                        data-value={value}
                        onClick={(e) => {
                          setBatch(e.currentTarget.dataset.value);
                          setDrop(false);
                        }}
                        key={index}
                        className={`w-full text-[12px] ${
                          batch === value
                            ? "bg-secondary text-primary"
                            : "bg-primary text-secondary"
                        }  flex justify-center py-2    hover:bg-secondary hover:text-primary  `}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${border.border_member_bot} py-4 px-6 bg-[#0000008F] rounded-b-[10px]  h-fit`}
        >
          <div className="overflow-x-auto w-full relative">
            <table className="  w-full border-separate  border-spacing-x-0 border-spacing-y-2  ">
              <thead className="">
                <tr className="text-[14px] text-[#1B4E6B]  font-semibold   ">
                  <td className=" bg-secondary pl-8  w-1/4  py-2 pr-3 rounded-s-[10px]">
                    NAME
                  </td>
                  <td className=" bg-secondary px-3   w-1/4">DATE EMPLOYED</td>
                  <td className=" bg-secondary px-3  w-1/4 ">STATUS</td>
                  <td className=" bg-secondary pl-3 pr-8  w-1/4 rounded-e-[10px]">
                    DIVISION
                  </td>
                </tr>
              </thead>
              <tbody className="text-[13px] text-white ">
                {isLoading
                  ? null
                  : members?.map((v, index) => {
                      return (
                        <tr
                          key={index}
                          className="border opacity-60 transition-all group  hover:opacity-100 border-collapse  rounded-xl overflow-hidden"
                        >
                          <td className="pl-8 pr-3 py-4 rounded-s-[10px] group-hover:bg-[#1B4E6B1A]">
                            <div className="flex items-center gap-2">
                              <Image
                                src={`/uploads/${v.image}`}
                                className="w-[30px]  aspect-square rounded-full object-cover"
                                width={100}
                                height={100}
                                alt="Foto Profile"
                              />
                              <h2 className="flex  flex-col">{v.name}</h2>
                            </div>
                          </td>

                          <td className=" px-3 group-hover:bg-[#1B4E6B1A]">
                            <div className="flex flex-col">
                              <span className="text-[#D1D5DB]">
                                January 1, 2024
                              </span>
                            </div>
                          </td>
                          <td className="px-3 group-hover:bg-[#1B4E6B1A]">
                            Active
                          </td>
                          <td className="pr-8 p-3 rounded-e-[10px] group-hover:bg-[#1B4E6B1A]">
                            {v.position} {v.division}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <h3 className="text-[#FFFFFF8F] text-[12px]">
          Showing 1 to 10 of 20, 567 entries
        </h3>
        <div className="flex gap-2 text-[12px]">
          <button className="bg-secondary rounded-[10px] px-2 py-1 text-primary">
            Previous
          </button>
          <button className="bg-secondary rounded-[10px] px-2 py-1 text-primary">
            1
          </button>
          <button className="bg-secondary rounded-[10px] px-2 py-1 text-primary">
            2
          </button>
          <button className="bg-secondary rounded-[10px] px-2 py-1 text-primary">
            3
          </button>
          <button className="bg-secondary rounded-[10px] px-2 py-1 text-primary">
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
