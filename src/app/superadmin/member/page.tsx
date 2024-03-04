"use client";
import Navbar from "@/components/superadmin/navbar";
import border from "@/styles/border.module.css";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PageSuperAdminMember() {
  const [members, setMembers] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchMember = async () => {
    setIsLoading(true);
    const data = await axios.get("/api/members?count=8");
    setMembers(data.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMember();
  }, []);
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
            <div className="text-[12px] items-center flex gap-1">
              Show
              <select
                className="border-white border rounded-[5px] bg-transparent"
                name=""
                id=""
              >
                <option value="">10</option>
                <option value="">20</option>
              </select>
              Entries
            </div>
            <div className="flex gap-2">
              <div>Filter</div>
              <div>Filter</div>
            </div>
          </div>
        </div>
        <div
          className={`${border.border_member_bot} py-4 px-6 bg-[#0000008F] rounded-b-[10px]  h-fit`}
        >
          <div className="overflow-x-auto w-full">
            <table className="  w-full border-separate  border-spacing-x-0  ">
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
                          className="border border-collapse rounded-xl overflow-hidden"
                        >
                          <td className="pl-8 pr-3 py-4">
                            <div className="flex items-center gap-2 ">
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

                          <td className=" px-3 ">
                            <div className="flex flex-col">
                              <span className="text-[#D1D5DB]">
                                January 1, 2024
                              </span>
                            </div>
                          </td>
                          <td className="px-3">Active</td>
                          <td className="pr-8 p-3">
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
    </main>
  );
}
