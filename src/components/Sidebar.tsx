import React, { useState } from 'react'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Link from 'next/link';

const Sidebar: React.FC<any> = ({ active }) => {
  const [activeMenu, setActiveMenu] = useState<any>(active)

  const menus = [
    { id: 1, name: 'Dashboard', link: '/', component:  <InsightsOutlinedIcon color='inherit' fontSize='inherit' />},
    { id: 2, name: 'Articles', link: '/articles', component:  <ImportContactsOutlinedIcon color='inherit' fontSize='inherit' />},
    { id: 3, name: 'Events', link: '/events', component:  <AutoAwesomeOutlinedIcon color='inherit' fontSize='inherit' />},
    { id: 4, name: 'Divisions', link: '/divisions', component:  <WorkOutlineOutlinedIcon color='inherit' fontSize='inherit' />},
    { id: 5, name: 'Members', link: '/members', component:  <Groups2OutlinedIcon color='inherit' fontSize='inherit' />},
    { id: 6, name: 'Testimonials', link: '/testimonials', component:  <InsightsOutlinedIcon color='inherit' fontSize='inherit' />},
  ]

  return (
    <section className="flex flex-col w-2/12 bg-white rounded-l-3xl shadow-md">
        <div className="w-16 mx-auto mt-12 mb-20 pl-4 pr-5 pt-2 pb-3 bg-secondary rounded-2xl text-primary text-4xl">
          <WidgetsRoundedIcon color='inherit' fontSize='inherit' />
        </div>

        <nav className="relative flex flex-col py-0 items-center">
          {
            menus.map((menu, index) => (
                <Link key={index} href={menu.link} about={menu.name} title={menu.name} className={`w-16 p-4 border rounded-2xl mb-4 text-2xl flex items-center justify-center py-5 ${menu.name == activeMenu ? 'text-primary bg-secondary border-secondary' : 'text-gray-700'} hover:text-primary hover:bg-secondary hover:border-secondary duration-700 transition-all`}>
                    {menu.component}
                </Link>
            ))
          }
          
          <a href="#" className="w-16 p-4 mt-8 border text-gray-700 rounded-2xl text-2xl flex items-center justify-center py-5">
            <LogoutOutlinedIcon color='inherit' fontSize='inherit' />
          </a>
        </nav>
    </section>
  )
}

export default Sidebar