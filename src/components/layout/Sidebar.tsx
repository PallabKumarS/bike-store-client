import { Layout, Menu } from "antd";
import { TSidebarRoute } from "../../types/route.type";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import adminPaths from "../../routes/adminRoutes";
import sidebarRoutesGenerator from "../../utils/sidebarRoutesGenerator";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  let sidebarRoutes: TSidebarRoute[] | undefined;

  const user = useAppSelector(selectCurrentUser) as TUser | null;

  switch (user?.role || "admin") {
    case "admin":
      sidebarRoutes = sidebarRoutesGenerator(adminPaths, "admin");
      break;
    case "customer":
      sidebarRoutes?.push({
        key: "dashboard",
        label: <NavLink to={"/customer/dashboard"}>Dashboard</NavLink>,
      });
      break;
    default:
      sidebarRoutes = [];
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
    >
      <h1 className="text-xl font-bold text-white text-center">Bike Store</h1>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[``]}
        items={sidebarRoutes}
      />
    </Sider>
  );
};
export default Sidebar;
