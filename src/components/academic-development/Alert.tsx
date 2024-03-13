import useAlert from "@/hooks/useAlert";
import border from "@/styles/border.module.css";
import "animate.css";
import { AlarmIcon } from "../icons";

export default function Alert() {
  const { setIsActive } = useAlert();
  return (
    <div
      className={` fixed animate__animated animate__fadeIn z-[99999]  flex  inset-0 bg-[#000000CC] justify-center items-center`}
    >
      <div
        className={`${border.border_graph} rounded-[10px] w-[30%] flex p-8 flex-col items-center bg-[#1B4E6BE5]`}
      >
        <div className="bg-[#FFDE594D] w-fit p-3 flex justify-center items-center rounded-full">
          <AlarmIcon />
        </div>
        <h2 className="text-[28px] font-bold mt-1">Log Out</h2>
        <div className="text-[14px] text-[#FFFFFF8F] text-center">
          <p>Are you sure you want to log out from this page?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div className="flex w-full gap-5 mt-4">
          <button
            className="relative w-full rounded-[5px] p-[10px] bg-[#FFFFFF8F]"
            onClick={() => setIsActive(false)}
          >
            No
          </button>
          <button
            className="relative w-full rounded-[5px] p-[10px] bg-secondary text-primary"
            onClick={() => {}}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
