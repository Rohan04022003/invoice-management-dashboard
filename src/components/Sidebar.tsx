// src/components/Sidebar.tsx

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  MoreVertical,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import type { NavLinkType, SidebarProps } from "@/types/type";

const navLinks: NavLinkType[] = [
  { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { path: "/invoices", label: "Invoices", icon: <FileText size={18} /> },
  { path: "/clients", label: "Clients", icon: <Users size={18} /> },
  { path: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

const Sidebar = ({ openNav, setOpenNav }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={`
  dark:bg-zinc-800 bg-zinc-100 h-screen pt-3 
  lg:sticky fixed top-0 z-10 
  duration-500 transform overflow-hidden border-r
  ${openNav
          ? 'w-full h-screen sm:w-1/2 lg:w-56 px-2 border-r'
          : 'w-0 px-0 border-none'}
`}
    >

      <div className="relative w-full h-full">
        <header className="mb-6 flex justify-between items-center px-3">
          <Link to={"/"} className="text-2xl font-semibold tracking-tight text-nowrap">Invoice App</Link>
          <div onClick={() => setOpenNav(!openNav)} className="lg:hidden bloack flex justify-center items-center">
            {openNav ? <PanelLeftClose size={22} className="cursor-pointer lg:text-lg text-3xl" /> : <PanelRightClose size={22} className="cursor-pointer" />}
          </div>
        </header>

        <nav className="flex flex-col gap-1">
          {navLinks.map((nav, index) => (
            <Link
              onClick={() => {
                if (window.innerWidth < 1023) {
                  setOpenNav(false);
                }
              }}
              key={index}
              to={nav.path}
              aria-current={location.pathname === nav.path ? "page" : undefined}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:hover:bg-muted hover:bg-background  ${location.pathname === nav.path ? "dark:bg-muted bg-background text-foreground" : "text-muted-foreground"
                }`}
            >
              <span>{nav.icon}</span>
              <span>{nav.label}</span>
            </Link>
          ))}
        </nav>
        <div className="user-profile w-full flex items-center justify-between bottom-0 absolute py-4 border-t cursor-pointer">
          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" className="w-8 rounded-sm" />
            </Avatar>
            <div className="text-[.8rem]">
              <p>Rohan Mahto</p>
              <p className="text-gray-500">rohan@example.com</p>
            </div>
          </div>
          <MoreVertical size={20} color="gray" />

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
