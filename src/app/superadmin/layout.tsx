"use client";
import NewSidebar from "@/components/NewSidebar";
import useActive from "@/hooks/useActive";
import { CiSearch } from "react-icons/ci";

export default function LayoutSuperAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isActive } = useActive();
  return (
    <main className="flex w-full min-h-screen shadow-lg bg-primary text-primary">
      <NewSidebar />
      <div
        className={`transition-all bg-primary w-full min-h-screen ease-linear  duration-[400ms] absolute ${
          isActive ? "pl-[104px]" : "pl-[256px]"
        } text-white`}
      >
        <div className="py-6 px-10">{children}</div>
      </div>
    </main>
  );
}
