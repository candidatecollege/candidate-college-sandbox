import Image from "next/image";

import { LogoutIcon } from "@/components/icons";
import { usePathname } from "next/navigation";

import styles from "@/styles/border.module.css";

import iconStyles from "@/styles/icon.module.css";
import useActive from "@/hooks/useActive";
import Separator from "./Separator";

export default function SidebarMobile({
  navLink,
  pathname,
}: {
  navLink: any;
  pathname: any;
}) {
  const { isActive } = useActive();

  return (
    <section
      className={`${styles.border_nav}  transition-all ${
        isActive
          ? "z-20   animate__animated animate__fadeIn"
          : " animate__animated animate__fadeOut !absolute"
      }   flex flex-col bg-[#0000008F] h-full py-6 w-[104px] `}
    >
      <div className="py-2 px-4">
        <Image
          className="w-[60px] h-[60px] mx-auto"
          alt="Logo Candidate College"
          width={100}
          height={100}
          src={"/logo-cc.png"}
        />
      </div>

      <div className="flex gap-3  justify-center w-full mt-5 px-4 ">
        <Image
          src="/Avatar.png"
          className="w-[48px] h-[48px] rounded-full"
          width={100}
          height={100}
          alt="Photo Profile"
        />
      </div>
      <Separator />
      <div className="mt-4 px-4 overflow-y-auto mx-auto">
        <h2 className="text-[#FFFFFF52] font-medium text-[11px] px-3">MAIN</h2>
        <ul className="flex mt-2 relative z- flex-col">
          {navLink.map(({ title, path, icon }: any, index: number) => {
            return (
              <li
                key={index}
                className={`${styles.border_link} ${
                  pathname.startsWith(path) && styles.border_link_active
                }   justify-center  rounded-[10px] px-3  py-3 flex gap-4 items-center text-[#FFFFFF8F] text-[14px]`}
              >
                {icon}
              </li>
            );
          })}
        </ul>
      </div>

      <Separator />

      <div className="flex flex-auto justify-end mx-auto items-end">
        <div className={`w-full h-fit`}>
          <button
            className={`duration-300 transition-all ${iconStyles.logout_icon} hover:bg-primary p-3 drop-shadow-md justify-center rounded-xl items-center w-full  text-[14px] font-semibold bg-secondary flex gap-1`}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
