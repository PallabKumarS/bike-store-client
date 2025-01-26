import { NavLink } from "react-router-dom";
import { TSidebarRoute, TUserPaths } from "../types/route.type";

export default function sidebarRoutesGenerator(
  items: TUserPaths[],
  role: string
) {
  const sidebarRoutes: TSidebarRoute[] = items.reduce(
    (acc: TSidebarRoute[], item: TUserPaths): TSidebarRoute[] => {
      if (item.name && item.path) {
        if (item.name.includes("Details")) return acc;
        acc.push({
          key: item.name,
          label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        });
      } else if (item.children) {
        acc.push({
          key: item.name,
          label: item.name,
          children: item.children
            .filter((child) => !child.name.includes("Details"))
            .map((child) => ({
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            })),
        });
      }
      return acc;
    },
    []
  );

  return sidebarRoutes;
}
