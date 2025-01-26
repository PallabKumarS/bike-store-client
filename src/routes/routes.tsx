import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import mainRoutes from "./mainRoutes";
import adminPaths from "./adminRoutes";
import UserDashboard from "../pages/user/UserDashboard";
import DashboardLayout from "../components/layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(mainRoutes),
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/customer",
    element: <DashboardLayout />,
    children: [
      {
        path: "customer/dashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);

export default router;
