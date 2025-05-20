import { useEffect, useState, type PropsWithChildren } from 'react'
import Sidebar from './Sidebar'
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/theme-provider"
import { BellIcon, Moon, PanelLeftClose, PanelRightClose, Sun } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'

const Layout = ({ children }: PropsWithChildren) => {

  const { setTheme, theme } = useTheme()
  const [openNav, setOpenNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 1023) {
    setOpenNav(false);
  }
}, []);

  return (
    <div className='flex min-h-screen'>
      <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
      <main className='flex-1'>
        <header className="flex justify-between items-center border-b px-4 py-3">
          <div className="left flex items-center md:gap-4">
            <div onClick={() => setOpenNav(!openNav)}>
              {openNav ? <PanelLeftClose size={22} className="mr-2 cursor-pointer" /> : <PanelRightClose size={22} className="mr-2 cursor-pointer" />}
            </div>
            <p className="border-l md:pl-6 pl-2 py-0">{location.pathname.slice(1) ? location.pathname.slice(1,).charAt(0).toUpperCase() + location.pathname.slice(2) : "Dashboard"}</p>
          </div>
          <div className="right flex items-center gap-3">
            <Button className='cursor-pointer' size={"sm"} variant={"outline"} onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}>{theme === "dark" ? <Sun /> : <Moon />}</Button>
            <div className='notifications relative'>
              <Link to={"/notifications"}><Button className='cursor-pointer' size={"sm"} variant={"outline"}><BellIcon /></Button></Link>
              <span className='absolute w-2 h-2 bg-red-500 rounded-full right-1 top-1'></span>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}

export default Layout