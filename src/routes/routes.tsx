import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import mainRoutes from "./mainRoutes";
import adminPaths from "./adminRoutes";
import UserDashboard from "../pages/user/UserDashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import ErrorPage from "@/pages/Errorpage";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import OrderManagement from "@/pages/admin/OrderManagement";
import OrderTracking from "@/pages/user/OrderTracking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(mainRoutes),
    errorElement: <ErrorPage />,
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
        path: "/customer/dashboard",
        element: (
          <ProtectedRoute role="customer">
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customer/my-orders",
        element: (
          <ProtectedRoute role="customer">
            <OrderManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customer/order-tracking/:orderId",
        element: (
          <ProtectedRoute role="customer">
            <OrderTracking />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
