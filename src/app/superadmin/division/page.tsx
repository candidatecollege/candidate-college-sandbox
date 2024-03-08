import ComingSoon from '@/components/ComingSoon'
import Navbar from "@/components/superadmin/navbar";

export default function PageDivisionSuperAdmin() {
  return (
    <main>
      <Navbar
          title="Division"
          description="Welcome To Your Division Page"
          placeholder="Search for anything"
      />
      <br />
      <ComingSoon />
    </main>
  )
}