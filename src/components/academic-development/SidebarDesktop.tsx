import {useState} from "react"
import Image from "next/image";

import { LogoutIcon } from "@/components/icons";

import styles from "@/styles/border.module.css";

import iconStyles from "@/styles/icon.module.css";
import useActive from "@/hooks/useActive";
import Separator from "@/components/sidebar/Separator";
import Link from "next/link";
import useAlert from "@/hooks/useAlert";

// Import Components
import Logout from "../Logout";

export default function SidebarDesktop({
  navLink,
  pathname,
}: {
  navLink: any;
  pathname: string;
}) {
  const { isActive } = useActive();
  const { setIsActive } = useAlert();
  const [open, setOpen] = useState<boolean>(false)

  // Used to open log out popup
  const handleClick = () => setOpen(false)
  return (
    <section
      className={`${styles.border_nav} z-10 transition-all ${
        isActive
          ? "animate__animated animate__fadeOut  !absolute inset-y-0"
          : "animate__animated animate__fadeIn"
      }  flex flex-col bg-[#0000008F] h-full py-6 w-[256px] `}
    >
      <div className="">
        <Image
          className="w-[142px]  h-[80px] mx-auto"
          alt="Logo Candidate College"
          width={100}
          height={100}
          src={"/logo-full-cc.png"}
        />
      </div>

      <div className="flex gap-3  justify-center w-full mt-3 px-5 ">
        <Image
          src="/Avatar.png"
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
      <Separator />
      <div className="mt-4 px-4 overflow-y-auto">
        <h2 className="text-[#FFFFFF52] font-medium text-[11px] px-5">MAIN</h2>
        <ul className="flex mt-2 relative flex-col">
          {navLink.map(({ title, path, icon }: any, index: number) => {
            return (
              <Link
                key={index}
                href={path}
                className={`${styles.border_link} ${
                  path == "/academic-development"
                    ? pathname == path && styles.border_link_active
                    : pathname.startsWith(path) && styles.border_link_active
                } rounded-[10px]  px-5 py-3 flex gap-4 items-center text-[#FFFFFF8F] text-[14px]`}
              >
                {icon} {title}
              </Link>
            );
          })}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-auto justify-end  mt-4 mx-5 items-end">
        <div className={`${styles.border_thankyou}  bg-[#1B4E6B1A] p-4`}>
          <h3 className="text-center text-[16px] font-semibold text-white">
            Thank You
          </h3>
          <h4 className="text-center px-3 mt-1 text-[13px] font-medium text-[#FFFFFF8F]">
            For creating or adding new things
          </h4>
          <button
            onClick={() => setOpen(true)}
            className={` duration-300 ${iconStyles.logout_icon} hover:bg-primary transition-all hover:text-secondary p-3 drop-shadow-md justify-center rounded-xl items-center w-full  text-[14px] font-semibold bg-secondary flex gap-1`}
          >
            <LogoutIcon /> Log Out
          </button>
        </div>
      </div>
      {/* Logout Modal */}
      <Logout open={open} onClick={handleClick}/>
    </section>
  );
}
