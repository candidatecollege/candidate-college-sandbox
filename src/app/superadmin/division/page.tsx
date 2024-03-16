import ComingSoon from '@/components/ComingSoon'
import Navbar from "@/components/superadmin/navbar";

export default function PageDivisionSuperAdmin() {
  return (
    <main>
      <Navbar
          title="Division"
          description="Welcome To Your Division Dashboard"
          placeholder="Search for anything"
      />
      <br />
      <ComingSoon />
    </main>
  )
}