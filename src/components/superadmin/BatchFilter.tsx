// BatchFilter.tsx
import React, { useState } from "react";
import { RankingIcon } from "../icons";
import { IoIosArrowDown } from "react-icons/io";

interface BatchFilterProps {
  currentBatch: string;
  setBatch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const BatchFilter: React.FC<BatchFilterProps> = ({
  currentBatch,
  setBatch,
}) => {
  const options = ["Batch 1", "Batch 2", "Batch 3"];
  const [drop, setDrop] = useState<boolean>(false);

  return (
    <div className="relative text-[12px]">
      <button
        onClick={() => setDrop((v) => !v)}
        className="flex items-center gap-2 border  rounded-[5px] px-2 py-1"
      >
        <div className="flex items-center gap-1">
          <RankingIcon /> {currentBatch ? currentBatch : "Batch"}
        </div>
        <IoIosArrowDown className={`${drop && "rotate-180"} transition-all`} />
      </button>
      <div
        className={`absolute  z-10 mt-2 duration-300  transition-all rounded-[5px]  ${
          drop ? "opacity-100  cursor-pointer" : "opacity-0 cursor-default"
        }  overflow-hidden inset-x-0`}
      >
        {options.map((value, index) => {
          return (
            <div
              data-value={value}
              onClick={(e) => {
                setBatch(e.currentTarget.dataset.value);
                setDrop(false);
              }}
              key={index}
              className={`w-full text-[12px] ${
                currentBatch === value
                  ? "bg-secondary text-primary"
                  : "bg-primary text-secondary"
              }  flex justify-center py-2    hover:bg-secondary hover:text-primary  `}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BatchFilter;
