"use client";
import Image from "next/image";
import Link from "next/link";

import {
  ArticleIcon,
  BriefcaseIcon,
  LogoutIcon,
  PeopleIcon,
  StickNoteIcon,
  DashboardIcon,
} from "@/components/icons";

import styles from "@/styles/border.module.css";

import iconStyles from "@/styles/icon.module.css";
import "animate.css";
import useActive from "@/hooks/useActive";
import ButtonSidebar from "@/components/sidebar/ButtonSidebar";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";
import { usePathname } from "next/navigation";

export default function NewSidebar() {
  const { isActive } = useActive();
  const pathname = usePathname();
  const navLink = [
    {
      title: "Dashboard",
      path: "/academic-development",
      icon: <DashboardIcon />,
    },
    {
      title: "Article",
      path: "/academic-development/articles",
      icon: <ArticleIcon />,
    },
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
