import Navbar from "@/components/superadmin/navbar";

export default function PageSuperAdminMember() {
  return (
    <main>
      <Navbar
        title="Member"
        description="Welcome To Your Member Dashboard"
        placeholder="Search for anything"
      />
      <div className="h-fit mt-4">
        <div>
          <div className="text-[12px] flex gap-1">
            Show
            <select
              className="border-white border rounded-[5px] bg-transparent"
              name=""
              id=""
            >
              <option value="">10</option>
              <option value="">20</option>
            </select>
            Entries
          </div>
          <div>
            <div>Filter</div>
            <div>Filter</div>
          </div>
        </div>
      </div>
    </main>
  );
}
