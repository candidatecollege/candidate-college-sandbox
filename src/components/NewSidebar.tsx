import Image from "next/image";
import Link from "next/link";
import DashboardIcon from "./icons/DashboardIcon";
import {
  ArticleIcon,
  BriefcaseIcon,
  LogoutIcon,
  PeopleIcon,
  StickNoteIcon,
} from "./icons";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../styles/border.module.css";

export default function NewSidebar() {
  const navLink = [
    { title: "Dashboard", icon: <DashboardIcon /> },
    { title: "Article", icon: <ArticleIcon /> },
    { title: "Event", icon: <StickNoteIcon /> },
    { title: "Division", icon: <BriefcaseIcon /> },
    { title: "Member", icon: <PeopleIcon /> },
  ];

  return (
    <section
      className={`${styles.border_nav}  flex flex-col bg-[#0000008F]  py-3 w-2/12`}
    >
      <div className="py-2 relative">
        <div
          className={`${styles.border_arrow} flex justify-center item absolute p-2 -right-3 rounded-full  bg-[#0F090C66] bottom-3 text-secondary`}
        >
          <IoIosArrowBack />
        </div>
        <Image
          className="w-[142px]  h-[80px] mx-auto"
          alt="Logo Candidate College"
          width={100}
          height={100}
          src={"logo-full-cc.png"}
        />
      </div>

      <div className="flex gap-3  justify-center w-full mt-3 px-5 ">
        <Image
          src="Avatar.png"
          className="w-[48px] h-[48px] rounded-full"
          width={100}
          height={100}
          alt="Photo Profile"
        />
        <div className="flex flex-col justify-center">
          <h4 className="text-[11px] uppercase text-[##FFFFFF52] font-medium">
            Academic Development
          </h4>
          <h3 className="font-medium text-[14px] text-white">Maudy Ayunda</h3>
        </div>
      </div>
      <div className="w-full relative after:absolute after:inset-0 after:bg-[#0c222fb9] mt-4 h-[1px] bg-[radial-gradient(50%_50%_at_50%_50%,#FFDE59_0%,rgba(27,78,107,0)_100%)]"></div>
      <div className="mt-4 px-4 overflow-y-auto">
        <h2 className="text-[#FFFFFF52] font-medium text-[11px] px-5">MAIN</h2>
        <ul className="flex mt-2 relative flex-col">
          {navLink.map(({ title, icon }, index) => {
            return (
              <li
                className={`${styles.border_link} rounded-[10px]  px-5 py-3 flex shadow gap-4 items-center text-[#FFFFFF8F] text-[14px]`}
              >
                {icon} {title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full relative after:absolute after:inset-0 after:bg-[#0c222fb9] mt-4 h-[1px] bg-[radial-gradient(50%_50%_at_50%_50%,#FFDE59_0%,rgba(27,78,107,0)_100%)]"></div>

      <div className="flex flex-auto justify-end  mt-4 mx-5 items-end">
        <div className={`${styles.border_thankyou}  bg-[#1B4E6B1A] p-4`}>
          <h3 className="text-center text-[16px] font-semibold text-white">
            Thank You
          </h3>
          <h4 className="text-center px-3 mt-1 text-[13px] font-medium text-[#FFFFFF8F]">
            For creating or adding new things
          </h4>
          <button className="text-primary mt-4 py-3 drop-shadow-md justify-center rounded-xl items-center w-full  text-[14px] font-semibold bg-secondary flex gap-1">
            <LogoutIcon /> Log Out
          </button>
        </div>
      </div>
    </section>
  );
}
