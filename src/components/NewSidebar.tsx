"use client";
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

import styles from "@/styles/border.module.css";

import iconStyles from "@/styles/icon.module.css";
import "animate.css";
import useActive from "@/hooks/useActive";
import ButtonSidebar from "./sidebar/ButtonSidebar";
import SidebarMobile from "./sidebar/SidebarMobile";
import SidebarDesktop from "./sidebar/SidebarDesktop";
import { usePathname } from "next/navigation";

export default function NewSidebar() {
  const { isActive } = useActive();
  const pathname = usePathname();
  const navLink = [
    {
      title: "Dashboard",
      path: "/superadmin",
      icon: <DashboardIcon />,
    },
    { title: "Article", path: "/superadmin/articles", icon: <ArticleIcon /> },
    { title: "Event", path: "/superadmin/events", icon: <StickNoteIcon /> },
    {
      title: "Division",
      path: "/superadmin/division",
      icon: <BriefcaseIcon />,
    },
    { title: "Member", path: "/superadmin/member", icon: <PeopleIcon /> },
  ];

  return (
    <div className="fixed z-30 inset-y-0">
      {/* // <> */}
      <ButtonSidebar />
      {/* Sidebar mobile */}
      <SidebarMobile pathname={pathname} navLink={navLink} />
      {/* Sidebar Desktop */}
      <SidebarDesktop pathname={pathname} navLink={navLink} />
    </div>
  );
}
