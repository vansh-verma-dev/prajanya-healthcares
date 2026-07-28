import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import myLogo from "../assets/PLogo.png";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import LegalDropdown from "./LegalLink";
import { MdDashboard } from "react-icons/md";


function Navbar() {
  const [open, setOpen] = useState(false);
  const [legalOpenMobile, setLegalOpenMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

 
  useEffect(() => {
    const checkAdmin = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      setIsAdmin(currentUser?.role === "admin");
    };

    checkAdmin();  

 
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/ProductHome" },
    { name: "About", path: "/AboutPage" },
    { name: "Contact", path: "/contact" },

  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Shipping Policy", path: "/shipping-policy" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3 cursor-pointer">

            <img src={myLogo} alt="Amritasya Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-green-600"
            />

            <div>
              <h1 className="text-2xl font-bold text-green-700">
                Prajanya
              </h1>

              <p className="text-xs tracking-[4px] text-gray-500">
                Healthcares
              </p>
            </div>

          </div>
        </Link>

        {/* Desktop Menu */}

        <ul className="hidden lg:flex items-center gap-8">

          {navLinks.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition ${isActive
                    ? "text-green-700"
                    : "text-gray-700 hover:text-green-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          <LegalDropdown />
        </ul>

        {/* Right Icons */}

        <div className="hidden lg:flex items-center gap-3">

          <Link to={"/Createaccount"}>
            <button className="w-11 h-11 rounded-full bg-green-50 hover:bg-green-700 hover:text-white transition flex items-center justify-center text-xl">
              <FaRegUser />
            </button>
          </Link>
 
          {isAdmin && (
            <Link
              to={"/AdminOrders"}
            >
              <button className="w-11 h-11 rounded-full bg-green-50 hover:bg-green-700 hover:text-white transition flex items-center justify-center text-xl">
                <MdDashboard />
              </button>
            </Link>
          )}

          <Link
            to={"/MyCart"}
          >
            <button className="relative w-11 h-11 rounded-full bg-green-700 text-white hover:bg-green-800 transition flex items-center justify-center text-2xl">

              <IoCartOutline />

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>

            </button>
          </Link>


        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-3xl text-green-700"
        >
          {open ? <IoMdClose /> : <IoMenu />}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[600px]" : "max-h-0"
          }`}
      >
        <div className="px-5 py-5 bg-white border-t">

          <ul className="flex flex-col gap-5">

            {navLinks.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-medium transition ${isActive
                      ? "text-green-700"
                      : "text-gray-700 hover:text-green-700"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* Legal accordion */}
            <li>
              <button
                type="button"
                onClick={() => setLegalOpenMobile((o) => !o)}
                className="flex w-full items-center justify-between font-medium text-gray-700 hover:text-green-700"
              >
                Legal
                <IoMenu
                  className={`transition-transform duration-200 ${legalOpenMobile ? "rotate-90" : ""
                    }`}
                  size={16}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${legalOpenMobile ? "max-h-40 mt-3" : "max-h-0"
                  }`}
              >
                <ul className="flex flex-col gap-3 border-l-2 border-green-100 pl-4">
                  {legalLinks.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => {
                          setOpen(false);
                          setLegalOpenMobile(false);
                        }}
                        className={({ isActive }) =>
                          `text-sm font-medium transition ${isActive
                            ? "text-green-700"
                            : "text-gray-500 hover:text-green-700"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

          </ul>

          <div className="flex gap-4 mt-6">

            <Link to={"/Createaccount"}>
              <button className="w-11 h-11 rounded-full bg-green-100 flex justify-center items-center">
                <FaRegUser />
              </button>
            </Link>

            <Link to={"/MyCart"}>
              <button className="w-11 h-11 rounded-full bg-green-700 text-white flex justify-center items-center">
                <IoCartOutline />
              </button>
            </Link>

            {/* 👇 Sirf admin ko dikhega */}
            {isAdmin && (
              <Link to={"/AdminOrders"}>
                <button className="w-11 h-11 rounded-full bg-green-100 flex justify-center items-center">
                  <MdDashboard />
                </button>
              </Link>
            )}

          </div>

        </div>
      </div>

    </header>
  );
}

export default Navbar;