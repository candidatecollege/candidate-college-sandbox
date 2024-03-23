import { IoIosArrowDown } from "react-icons/io";
import border from "@/styles/border.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InputSelect({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [drop, setDrop] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<any[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get("/api/article/categories");

      setCategories(data.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [value]);

  return (
    <div className="relative">
      <label htmlFor="title">Category*</label>
      <div className=" mt-1">
        <button
          type="button"
          onClick={() => setDrop((v) => !v)}
          className={`${border.border_input_article} flex p-3 h-full items-center justify-between gap-2   before:bg-[radial-gradient(100%_100%_at_0%_0%,#ffde59_0%,#5eacdd_100%)] rounded-[3px] w-full`}
        >
          <div className="flex items-center text-[rgba(255,255,255,0.56)] gap-1">
            {isLoading ? (
              "Loading..."
            ) : value ? (
              <p className="text-white">{value}</p>
            ) : (
              "Choose Category"
            )}
          </div>
          <IoIosArrowDown
            className={`${drop && "rotate-180"} transition-all`}
          />
        </button>
        <div
          className={`absolute  z-10 mt-2 duration-300 h-40 overflow-y-auto transition-all rounded-[3px]  ${
            drop
              ? "animate__animated animate__fadeIn  cursor-pointer"
              : "animate-hilang cursor-default"
          }  overflow-hidden inset-x-0`}
        >
          {!isLoading &&
            categories.map((v, index) => {
              return (
                <div
                  data-value={v.id}
                  onClick={(e) => {
                    if (e.currentTarget.dataset.value)
                      setValue(e.currentTarget.dataset.value);
                    setDrop(false);
                  }}
                  key={index}
                  className={`w-full text-[12px] transition-all ${
                    value === v.id
                      ? "bg-secondary text-primary"
                      : "bg-secondary text-primary"
                  }  flex justify-center py-2    hover:bg-primary hover:text-secondary  `}
                >
                  {v.name}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
