import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { FiSettings } from "react-icons/fi";
import { FaUsers, FaHandshake } from "react-icons/fa";
import { IoStorefront, IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiPowerOff } from "react-icons/bi";
import { BsFillTagsFill } from "react-icons/bs";
import SideBarItem from "./Sidebar/SideBarItem";
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");
  const [buttonHover, setButtonHover] = useState(null);
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-hidden="true"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between pr-3 mb-6 sm:px-2">
          {/* Close button */}
          <button ref={trigger} className="lg:hidden text-slate-500 hover:text-slate-400" onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" aria-expanded={sidebarOpen}>
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
              <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
              <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
            </svg>
          </NavLink>
        </div>
        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-slate-500">
              <span className="hidden w-6 text-center lg:block lg:sidebar-expanded:hidden 2xl:hidden" aria-hidden="true">
                ?????????
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Principal</span>
            </h3>
            <ul className="mt-2">
              {/* Dashboard */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === "/" && "bg-slate-900"}`}>
                <NavLink to="/" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname === "/" && "hover:text-slate-200"}`}>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-400 ${pathname === "/" && "!text-indigo-500"}`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                      <path className={`fill-current text-slate-600 ${pathname === "/" && "text-indigo-600"}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                      <path className={`fill-current text-slate-400 ${pathname === "/" && "text-indigo-200"}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                    </svg>
                    <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">Dashboard</span>
                  </div>
                </NavLink>
              </li>
              {/* Analytics */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes("analytics") && "bg-slate-900"}`}>
                <NavLink end to="/analytics" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes("analytics") && "hover:text-slate-200"}`}>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-600 ${pathname.includes("analytics") && "text-indigo-500"}`} d="M0 20h24v2H0z" />
                      <path
                        className={`fill-current text-slate-400 ${pathname.includes("analytics") && "text-indigo-300"}`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">An??lisis</span>
                  </div>
                </NavLink>
              </li>
              <SideBarItem icon={<MdOutlineAttachMoney className={`w-6 h-6 shrink-0 ${pathname.includes("sales") && "text-indigo-600"}`} />} pathnameRoute="sales" itemName="Ventas" />

              <SideBarItem icon={<FiSettings className={`w-6 h-6 shrink-0 ${pathname.includes("configuration") && "text-indigo-600"}`} />} pathnameRoute="configuration" itemName="Configuraci??n" />
            </ul>
            <h3 className="pl-3 text-xs font-semibold uppercase text-slate-500 mt-6">
              <span className="hidden w-6 text-center lg:block lg:sidebar-expanded:hidden 2xl:hidden" aria-hidden="true">
                ?????????
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Negocio</span>
            </h3>
            <ul className="mb-2">
              <SideBarItem icon={<FaUsers className={`w-6 h-6 shrink-0 ${pathname.includes("clients") && "text-indigo-600"}`} />} pathnameRoute="clients" itemName="Clientes" />

              <SideBarItem icon={<FaHandshake className={`w-6 h-6 shrink-0 ${pathname.includes("suppliers") && "text-indigo-600"}`} />} pathnameRoute="suppliers" itemName="Proveedores" />

              <SideBarItem icon={<IoStorefront className={`w-6 h-6 shrink-0 ${pathname.includes("products") && "text-indigo-600"}`} />} pathnameRoute="products" itemName="Productos" />
              <SideBarItem icon={<BsFillTagsFill className={`w-6 h-6 shrink-0 ${pathname.includes("categories") && "text-indigo-600"}`} />} itemName="Categor??as" pathnameRoute="categories" />
              <SideBarItem icon={<IoAnalyticsSharp className={`w-6 h-6 shrink-0 ${pathname.includes("reports") && "text-indigo-600"}`} />} itemName="Reportes" pathnameRoute="reports" />

              <SideBarItem icon={<IoAnalyticsSharp className={`w-6 h-6 shrink-0 ${pathname.includes("transactions") && "text-indigo-600"}`} />} itemName="Transacciones" pathnameRoute="transactions" />
            </ul>
          </div>
        </div>
        <button className={` px-3 py-5 rounded-sm mb-0.5 mt-auto last:mb-0 flex items-center text-slate-200 hover:text-white truncate transition duration-150 hover:bg-slate-900`} onMouseEnter={() => setButtonHover(1)} onMouseLeave={() => setButtonHover(null)}>
          <BiPowerOff className={`w-6 h-6 shrink-0 transition-all  ${buttonHover === 1 ? "text-indigo-600" : ""}`} />
          <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">Salir</span>
        </button>
        {/* Expand / collapse button */}
        <div className="justify-end hidden pt-3 mt-auto lg:inline-flex 2xl:hidden">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
