import UserDashboard from "@/pages/user/UserDashboard";
import UserManagement from "../pages/admin/UserManagement";
import ProductDetails from "../pages/admin/product/ProductDetails";
import { TUserPaths } from "../types/route.type";
import OrderManagement from "@/pages/admin/OrderManagement";
import AllProducts from "@/pages/user/AllProducts";

const adminPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },

  {
    name: "User Management",
    path: "users",
    element: <UserManagement />,
  },
  {
    name: "Product Management",
    path: "products",
    element: <AllProducts />,
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
