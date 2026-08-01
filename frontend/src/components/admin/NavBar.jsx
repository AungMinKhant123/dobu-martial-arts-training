import { NavLink, useNavigate } from "react-router";
import {
  Gauge,
  CalendarDays,
  Mail,
  Clipboard,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "/logo.png";
import { logout } from "../../services/authService.js";
const NavBar = () => {
  const navigate = useNavigate();
  const navLinks = [
    {
      Icon: Gauge,
      path: "/admin/dashboard",
      name: "Overview",
      end: true,
    },
    {
      Icon: CalendarDays,
      path: "/admin/dashboard/schedules",
      name: "Schedule",
    },
    {
      Icon: Mail,
      path: "/admin/dashboard/enquiries",
      name: "Enquire Inbox",
    },
    {
      Icon: Clipboard,
      path: "/admin/dashboard/blogs",
      name: "Blog",
    },
    {
      Icon: UserRound,
      path: "/admin/dashboard/instructors",
      name: "Instructors",
    },
  ];
  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <nav className="w-fit fixed h-screen border-r-2 border-r-amber-50">
      <ul className="flex flex-col gap-5 mt-5">
        <div className="text-center">
          <img src={logo} alt="Logo" width={100} className="mx-auto mb-3" />
          <a href="/admin/dashboard" className="text-red-500">
            DoBu Admin
          </a>
        </div>
        {navLinks.map(({ Icon, path, name, end }, index) => (
          <li key={index}>
            <NavLink
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2 hover:bg-red-500 ${isActive ? "bg-red-500" : ""}`
              }
            >
              <Icon size={30} />
              {name}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-5 py-2 text-left hover:bg-red-500 "
          >
            <LogOut size={30} />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
