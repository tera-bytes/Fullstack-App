import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ApiProvider } from "./context/apiProvider";
import { CompaniesProvider } from "./context/companiesProvider";
import { EmployeesProvider } from "./context/employeesProvider";

export default function App() {
  return (
    <ApiProvider>
      <CompaniesProvider>
        <EmployeesProvider>
          <RouterProvider router={router} />
        </EmployeesProvider>
      </CompaniesProvider>
    </ApiProvider>
  );
}
