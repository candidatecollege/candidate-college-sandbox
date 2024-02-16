"use client";
import NewSidebar from "@/components/NewSidebar";
import useActive from "@/hooks/useActive";

export default function PageTest() {
  const { isActive } = useActive();
  return (
    <main className="flex w-full h-screen shadow-lg bg-primary text-primary">
      <NewSidebar />
      <div
        className={`transition-all  ease-linear duration-[400ms] absolute ${
          isActive ? "pl-[104px]" : "pl-[256px]"
        } text-white`}
      >
        <div className="p-3">
          lorem ipsum pushing everybadiii this design is so mumet ndasku
        </div>
      </div>
    </main>
  );
}
