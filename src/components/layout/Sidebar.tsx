import { Layout, Menu } from "antd";
import { TSidebarRoute } from "../../types/route.type";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import adminPaths from "../../routes/adminRoutes";
import sidebarRoutesGenerator from "../../utils/sidebarRoutesGenerator";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RiMenuFold4Fill, RiMenuFold3Fill } from "react-icons/ri";
import logo from "./../../assets/bikeStore.jpg";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  let sidebarRoutes: TSidebarRoute[] | undefined;

  const user = useAppSelector(selectCurrentUser) as TUser | null;

  switch (user?.role || "customer") {
    case "admin":
      sidebarRoutes = sidebarRoutesGenerator(adminPaths, "admin");
      break;
    case "customer":
      sidebarRoutes = [
        {
          key: "dashboard",
          label: <NavLink to={"/customer/dashboard"}>Dashboard</NavLink>,
        },
        {
          key: "my-orders",
          label: <NavLink to={"/customer/my-orders"}>My Orders</NavLink>,
        },
      ];
      break;
    default:
      sidebarRoutes = [];
  }

  return (
    <Sider
      translate="yes"
      breakpoint="md"
      collapsedWidth="0"
      trigger={null} // Disable default trigger
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          textAlign: "center",
          margin: "16px 0",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        <NavLink
          to="/"
          className="text-xl font-bold text-white text-center flex justify-center flex-wrap items-center gap-1"
        >
          <img src={logo} className="w-10 h-10 rounded-full" />

          <h3 className="text-lg text-wrap md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Moto Horizon
          </h3>
        </NavLink>
      </div>

      {/* Custom Trigger Button */}
      <div
        className="block lg:hidden"
        style={{
          position: "absolute",
          top: "4%",
          transform: "translateY(-50%)",
          left: collapsed ? "5px" : "190px",
          transition: "left 0.3s",
          zIndex: 50,
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <RiMenuFold4Fill className="text-4xl text-blue-700 z-50" />
        ) : (
          <RiMenuFold3Fill className="text-4xl text-blue-700 z-50" />
        )}
      </div>

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
