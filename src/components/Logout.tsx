// Import Packages
import React from "react"
import Link from "next/link";

// Import Icons
import { AlarmIcon } from "@/components/icons";

// Import Styles
import styles from "@/styles/border.module.css";
import "animate.css";

// Data Types
interface LogoutProps {
  open: boolean,
  onClick: () => void
}

// Modals
export default function Logout({open, onClick}: LogoutProps) {
  return (
    <div className={`fixed animate__animated animate__fadeIn inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/[.70]" : "invisible"}`}>
      {/* Container */}
      <div className={`bg-primary ${styles.border_graph} w-96 h-60 flex flex-col justify-center items-center rounded-lg gap-4 pb-8 shadow-xl`}>
          {/* Icon */}
          <div className="bg-[#FFDE59]/[.30] flex justify-center items-center p-3 rounded-full">
            <AlarmIcon />
          </div>
          {/* Title and Desc */}
          <div className="flex flex-col justify-center items-center gap-2">
            {/* Title */}
            <div className="text-2xl text-white font-bold">
              Log Out
            </div>
            {/* Desc */}
            <div className="flex flex-col text-xs text-[#FFFFFF]/[.56] font-extralight text-center tracking-wide">
              <div>Are you sure you want to log out from this page?</div> 
              <div>This action cannot be undone.</div>
            </div>
          </div>
          {/* Button */}
          <div className="relative flex flex-row">
            {/* No */}
            <div className="absolute right-2 top-0 bg-[#9BAFBB] hover:bg-[#9BAFBB]/[.40] px-12 py-2 text-xs text-white hover:text-white/[.60] font-semibold rounded cursor-pointer" onClick={onClick}>
              <button>No</button> 
            </div>
            {/* Yes */}
            <Link href="/auth">
              <div className="absolute left-2 top-0 bg-secondary hover:bg-secondary/[.60] px-12 py-2 text-xs text-primary hover:text-primary/[.90] font-semibold rounded cursor-pointer">
                <button>Yes</button>
              </div>
            </Link>
          </div>
      </div>
    </div>
  )
}