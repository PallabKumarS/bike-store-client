import UserDashboard from "@/pages/user/UserDashboard";
import UserManagement from "../pages/admin/UserManagement";
import ProductDetails from "../pages/admin/product/ProductDetails";
import { TUserPaths } from "../types/route.type";
import OrderManagement from "@/pages/admin/OrderManagement";
import AllProducts from "@/pages/user/AllProducts";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const adminPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: (
      <ProtectedRoute role="admin">
        <UserDashboard />
      </ProtectedRoute>
    ),
  },

  {
    name: "User Management",
    path: "users",
    element: (
      <ProtectedRoute role="admin">
        <UserManagement />
      </ProtectedRoute>
    ),
  },
  {
    name: "Product Management",
    path: "products",
    element: (
      <ProtectedRoute role="admin">
        <AllProducts />
      </ProtectedRoute>
    ),
  },
  {
    name: "Product Details",
    path: "products/:productId",
    element: (
      <ProtectedRoute role="admin">
        <ProductDetails />
      </ProtectedRoute>
    ),
  },
  {
    name: "Order Management",
    path: "orders",
    element: (
      <ProtectedRoute role="admin">
        <OrderManagement />
      </ProtectedRoute>
    ),
  },
];

export default adminPaths;
