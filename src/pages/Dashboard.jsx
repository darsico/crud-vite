import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import Home from "./Home";
import Clients from "./Clients";
import Analytics from "./Analytics";
import Sales from "./Sales";
import Configuration from "./Configuration";
import Suppliers from "./Suppliers";
import Products from "./Products";
import Reports from "./Reports";
import Transactions from "./Transactions";
import Categories from "./Categories";
// import Analytics from "./Analytics";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/clients" element={<Clients />} />
            <Route exact path="/analytics" element={<Analytics />} />
            <Route exact path="/sales" element={<Sales />} />
            <Route exact path="/configuration" element={<Configuration />} />
            <Route exact path="/suppliers" element={<Suppliers />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/reports" element={<Reports />} />
            <Route exact path="/transactions" element={<Transactions />} />
            <Route exact path="/categories" element={<Categories />} />
          </Routes>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
