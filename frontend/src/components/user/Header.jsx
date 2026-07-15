import { NavLink } from "react-router";
import Button from "../Button";
const Header = () => {
  const navLinks = [
    {
      path: "/",
      name: "Home",
      end: true,
    },
    {
      path: "/about-us",
      name: "About Us",
    },
    {
      path: "/classes",
      name: "Classes",
    },
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/contact",
      name: "Contact",
    },
  ];
  return (
    <>
      <header className="my-3">
        <nav className="w-5xl flex mx-auto justify-between items-center">
          <div>
            <NavLink to="/" end>
              <img src="https://placehold.co/50" alt="DoBu Martial Arts Logo" />
            </NavLink>
          </div>
          <ul className="flex gap-5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `hover:text-(--primary-color) ${isActive ? "text-(--primary-color)" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button variant="primary">Enroll a Class</Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
