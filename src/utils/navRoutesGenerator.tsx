import { NavLink } from "react-router-dom";
import { TSidebarRoute, TUserPaths } from "../types/route.type";

const navRouteGenerator = (routes: TUserPaths[]): TSidebarRoute[] => {
  return routes.map((route) => ({
    key: route.name,
    label: (
      <NavLink to={route.name === "Home" ? "/" : `/${route.path}`}>
        {route.name}
      </NavLink>
    ),
  }));
};

export default navRouteGenerator;
