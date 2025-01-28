import { TUserPaths } from "../types/route.type";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/user/AllProducts";
import Login from "../pages/Login";
import ProductDetails from "../pages/admin/product/ProductDetails";
import About from "@/pages/About";
import Checkout from "../pages/user/Checkout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import VerifyPayment from "@/pages/user/VerifyPayment";

const mainRoutes: TUserPaths[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "All Products",
    path: "products",
    element: <AllProducts />,
  },
  {
    name: "Product Details",
    path: "products/:productId",
    element: <ProductDetails />,
  },
  {
    name: "Checkout",
    path: "checkout/:productId",
    element: (
      <ProtectedRoute role="customer">
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    name: "Verify Payment",
    path: "verify-payment",
    element: (
      <ProtectedRoute role="customer">
        <VerifyPayment />
      </ProtectedRoute>
    ),
  },
  {
    name: "Login",
    path: "login",
    element: <Login />,
  },
  {
    name: "About Us",
    path: "about",
    element: <About />,
  },
];

export default mainRoutes;
