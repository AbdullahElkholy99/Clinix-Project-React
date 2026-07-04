import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "@/constants/storage";
import { toast } from "sonner";

import {
  Bell,
  CalendarDays,
  Stethoscope,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 text-sm font-medium transition-colors ${
    isActive
      ? "text-slate-900 dark:text-white"
      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
  }`;

  
export default function PatientNavBar() {

 const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-black/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white"
        >
          <Stethoscope size={28} />
          Clinix
        </Link>

        {/* Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/clinics" className={navLinkClass}>
            <Stethoscope size={18} />
            Clinics
          </NavLink>

          <NavLink to="/myAppointments" className={navLinkClass}>
            <CalendarDays size={18} />
            My Appointments
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className="text-slate-700 dark:text-slate-300 focus:text-slate-900 dark:focus:text-white"
                >
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  to="/myAppointments"
                  className="text-slate-700 dark:text-slate-300 focus:text-slate-900 dark:focus:text-white"
                >
                  My Appointments
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
               onClick={handleLogout}
               className="text-red-500 focus:text-red-500"
               >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
