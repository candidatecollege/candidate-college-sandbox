import { useState } from "react";
import border from "@/styles/border.module.css";
import { SMSIcon } from "../icons";

export default function InputEmail({
  className,
  email,
  setEmail,
}: {
  className?: string;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isFocusEmail, setIsFocusEmail] = useState<boolean>(false);
  return (
    <div
      className={`${border.border_input}     relative p-2 h-fit font-medium ${className}`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setIsFocusEmail(true)}
        onBlur={(e) => {
          !e.target.value && setIsFocusEmail(false);
        }}
        className={`absolute z-10   inset-2 outline-none bg-transparent`}
      />

      <div
        className={`flex absolute text-[#ffde599a]  ${
          !isFocusEmail ? "opacity-0" : "opacity-100"
        } items-center justify-center -top-2 bg-primary px-1 text-[8px] transition-opacity  gap-1`}
      >
        <SMSIcon size={"16"} /> Email
      </div>
      <div
        className={`flex text-[#ffde599a]  ${
          isFocusEmail ? "opacity-0" : "opacity-100"
        } transition-opacity inset-0 gap-2`}
      >
        <SMSIcon /> Email
      </div>
    </div>
  );
}
