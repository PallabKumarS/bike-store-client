import { NavLink } from "react-router-dom";
import { TSidebarRoute, TUserPaths } from "../types/route.type";
import { TUser } from "../redux/features/auth/authSlice";

const navRouteGenerator = (
  routes: TUserPaths[],
  token?: string | null,
  user?: TUser | null
): TSidebarRoute[] => {
  const navItems: TSidebarRoute[] = routes
    .filter((route) => {
      // Exclude "Orders", "Product Details", and "Login" always
      if (
        ["Checkout", "Product Details", "Login", "Home"].includes(route.name)
      ) {
        return false;
      }
      return true;
    })
    .map((route) => ({
      key: route.name,
      label: (
        <NavLink to={route.name === "Home" ? "/" : `/${route.path}`}>
          {route.name}
        </NavLink>
      ),
    }));

  if (token) {
    navItems.push({
      key: "dashboard",
      label: <NavLink to={`/${user?.role}/dashboard`}>Dashboard</NavLink>,
    });
  }

  return navItems;
};

export default navRouteGenerator;
