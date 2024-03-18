import { SetStateAction, useEffect, useState } from "react";
import border from "@/styles/border.module.css";
import { LockIcon } from "../icons";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import "@/styles/auth.css";

export default function InputPassword({
  className,
  password,
  setPassword,
}: {
  className?: string;
  password: string;
  setPassword: React.Dispatch<SetStateAction<string>>;
}) {
  const [isFocusPassword, setisFocusPassword] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(true);

  return (
    <div
      className={`${border.border_input}     relative p-2 h-fit font-medium ${className}`}
    >
      <input
        type={isHide ? "password" : "text"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onFocus={() => setisFocusPassword(true)}
        onBlur={(e) => {
          !e.target.value && setisFocusPassword(false);
        }}
        className={`absolute z-10 auth-input-password  inset-2 right-9 outline-none bg-transparent`}
      />

      <div
        onClick={() => setIsHide((v) => !v)}
        className="absolute text-[22px] z-10 cursor-pointer right-2 "
      >
        {isHide ? <FaRegEyeSlash /> : <FaRegEye />}
      </div>

      <div
        className={`flex absolute text-[#ffde599a]  ${
          !isFocusPassword ? "opacity-0" : "opacity-100"
        } items-center justify-center -top-2 bg-primary px-1 text-[8px] transition-opacity  gap-1`}
      >
        <LockIcon size={"16"} /> Password
      </div>
      <div
        className={`flex text-[#ffde599a]  ${
          isFocusPassword ? "opacity-0" : "opacity-100"
        } transition-opacity inset-0 gap-2`}
      >
        <LockIcon /> Password
      </div>
    </div>
  );
}
