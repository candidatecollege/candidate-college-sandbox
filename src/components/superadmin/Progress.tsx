export default function Progress({ percent }: { percent: string }) {
  console.log(percent);
  return (
    <div>
      <div className="bg-white relative h-[3px] w-full rounded-2xl">
        <div
          style={{ width: percent }}
          className={`bg-[#5EACDD] absolute top-0 left-0 h-full rounded-2xl`}
        ></div>
      </div>
    </div>
  );
}
