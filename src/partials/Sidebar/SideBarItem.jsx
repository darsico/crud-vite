import { NavLink, useLocation } from "react-router-dom";
const SideBarItem = ({ pathnameRoute, itemName, icon }) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes(pathnameRoute) && "bg-slate-900"}`}>
      <NavLink end to={`/${pathnameRoute}`} className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes(pathnameRoute) && "hover:text-slate-200"}`}>
        <div className="flex items-center">
          {icon}
          <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">{itemName}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default SideBarItem;
