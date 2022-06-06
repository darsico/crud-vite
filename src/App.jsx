import React from "react";

import "./css/style.scss";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import { SupplierProvider } from "./context/SupplierProvider";
import { CategoryProvider } from "./context/CategoryProvider";

function App() {
  return (
    <CategoryProvider>
      <SupplierProvider>
        <Dashboard />
      </SupplierProvider>
    </CategoryProvider>
  );
}

export default App;
