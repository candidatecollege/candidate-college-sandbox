import { CiSearch } from "react-icons/ci";

export default function Navbar({
  title,
  description,
  placeholder,
}: {
  title: string;
  description: string;
  placeholder?: string;
}) {
  return (
    <nav className="flex justify-between items-center">
      <div>
        <h1 className="text-[48px] leading-[50px]">{title}</h1>
        <p className="text-[14px] leading-[24px] text-[#FFFFFF8F]">
          {description}
        </p>
      </div>
      {placeholder && (
        <div className="w-fit flex text-[#ffffff8f] ">
          <button className="px-4  text-[16px] rounded-l-[10px] py-3 bg-[#0000008F]">
            <CiSearch />
          </button>
          <input
            className="bg-[#0000008F] text-[#ffffff8f]  text-[13px] leading-[20px]    rounded-r-[10px] pr-4 outline-none"
            placeholder={placeholder}
            type="text"
          />
        </div>
      )}
    </nav>
  );
}
