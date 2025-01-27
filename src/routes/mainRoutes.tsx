import { TUserPaths } from "../types/route.type";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/user/AllProducts";
import Login from "../pages/Login";
import ProductDetails from "../pages/admin/product/ProductDetails";
import About from "@/pages/About";
import Checkout from "../pages/user/Checkout";

const mainRoutes: TUserPaths[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "All Products",
    path: "all-products",
    element: <AllProducts />,
  },
  {
    name: "Product Details",
    path: "products/:productId",
    element: <ProductDetails />,
  },
  {
    name: "Checkout",
    path: "checkout",
    element: <Checkout />,
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
