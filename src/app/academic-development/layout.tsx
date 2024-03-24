"use client";
import NewSidebar from "@/components/academic-development/NewSidebar";
import useActive from "@/hooks/useActive";
import { CiSearch } from "react-icons/ci";

export default function LayoutSuperAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isActive } = useActive();
  return (
    <main className="flex w-full min-h-screen z-10 shadow-lg bg-primary text-primary">
      <NewSidebar />
      <div className={`transition-all z-10 bg-primary w-full min-h-screen ease-linear  duration-[400ms] absolute overflow-hidden ${isActive ? "pl-[104px]" : "pl-[256px]"} text-white`}>
        <div className="py-6 px-10">{children}</div>
      </div>
    </main>
  );
}
