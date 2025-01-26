import { TUserPaths } from "../types/route.type";
import Home from "../pages/Home";
import AllProducts from "../pages/user/AllProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/user/ProductDetails";
import Order from "../pages/user/Order";

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
    path: "product/:productId",
    element: <ProductDetails />,
  },
  {
    name: "Orders",
    path: "orders",
    element: <Order />,
  },
  {
    name: "login",
    path: "login",
    element: <Login />,
  },
  {
    name: "signup",
    path: "signup",
    element: <Register />,
  },
];

export default mainRoutes;
