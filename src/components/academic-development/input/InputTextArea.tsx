import border from "@/styles/border.module.css";
export default function InputTextArea({
  name,
  className,
  value,
  setValue,
}: {
  name: string;
  className?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className={`${className} relative`}>
      <label htmlFor={name}>{name}*</label>
      <div
        className={`${border.border_input_article} mt-1 rounded-[3px] before:bg-[radial-gradient(100%_100%_at_0%_0%,#ffde59_0%,#5eacdd_100%)]`}
      >
        <textarea
          onChange={(e) => setValue(e.target.value)}
          required
          value={value}
          id={name}
          placeholder={name}
          className="w-full bg-transparent outline-none p-3 relative"
        />
      </div>
    </div>
  );
}
