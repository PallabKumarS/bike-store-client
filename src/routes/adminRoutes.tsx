import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductManagement from "../pages/admin/product/ProductManagement";
import UserManagement from "../pages/admin/UserManagement";
import ProductDetails from "../pages/user/ProductDetails";
import { TUserPaths } from "../types/route.type";

const adminPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },

  // user management

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
];

export default adminPaths;
