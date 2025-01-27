import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductManagement from "../pages/admin/product/ProductManagement";
import UserManagement from "../pages/admin/UserManagement";
import ProductDetails from "../pages/admin/product/ProductDetails";
import { TUserPaths } from "../types/route.type";
import OrderManagement from "@/pages/admin/OrderManagement";

const adminPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },

  {
    name: "User Management",
    path: "users",
    element: <UserManagement />,
  },
  {
    name: "Product Management",
    path: "products",
    element: <ProductManagement />,
  },
  {
    name: "Product Details",
    path: "products/:productId",
    element: <ProductDetails />,
  },
  {
    name: "Order Management",
    path: "orders",
    element: <OrderManagement />,
  },
];

export default adminPaths;
