import Dropzone, { useDropzone } from "react-dropzone";
import { DirectSendIcon } from "../../icons";
import border from "@/styles/border.module.css";
import { SetStateAction, useEffect, useState } from "react";

function DropInputFile({
  text,
  setValue,
  value,
}: {
  text: string;
  setValue: React.Dispatch<SetStateAction<Blob | string>>;
  value: string | Blob;
}) {
  const [path, setPath] = useState<string>();
  useEffect(() => {
    if (value == "") {
      setPath(undefined);
    }
  }, [value]);
  return (
    <Dropzone
      accept={{
        "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      }}
      onDrop={(e) => {
        setPath(e[0].name);
        setValue(e[0]);
      }}
    >
      {({ getRootProps, getInputProps, isDragActive, fileRejections }) => (
        <div
          className={`cursor-pointer h-fit p-6 ${border.border_input_article} ${
            isDragActive
              ? "before:bg-[radial-gradient(100%_100%_at_0%_0%,#f49191_0%,#c30b0b_100%)]"
              : "before:bg-[radial-gradient(100%_100%_at_0%_0%,#ffde59_0%,#5eacdd_100%)]"
          } rounded-[3px]`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className={` flex flex-col items-center justify-center`}>
            <div className="bg-secondary w-fit p-2 rounded-[5px]">
              <DirectSendIcon />
            </div>

            {fileRejections.length !== 0 && <p>File not Accept</p>}
            {isDragActive ? (
              <p>Release Here...</p>
            ) : path ? (
              <p className="text-center">{path}</p>
            ) : (
              <p>{text}</p>
            )}
            <p className="text-sm text-[rgba(255,255,255,0.56)]">
              File Max 500 Kb
            </p>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

export default DropInputFile;
