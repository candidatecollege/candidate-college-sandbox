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

export default function NewSidebar() {
  const { isActive } = useActive();
  const navLink = [
    { title: "Dashboard", icon: <DashboardIcon /> },
    { title: "Article", icon: <ArticleIcon /> },
    { title: "Event", icon: <StickNoteIcon /> },
    { title: "Division", icon: <BriefcaseIcon /> },
    { title: "Member", icon: <PeopleIcon /> },
  ];

  return (
    <>
      <ButtonSidebar />
      {/* Sidebar mobile */}
      <SidebarMobile navLink={navLink} />
      {/* Sidebar Desktop */}
      <SidebarDesktop navLink={navLink} />
    </>
  );
}
