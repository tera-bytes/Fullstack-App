import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeesPage from "./pages/EmployeesPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <EmployeesPage /> }
    ]
  }
]);
