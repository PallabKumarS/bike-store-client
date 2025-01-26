import { Menu } from "antd";
import navRouteGenerator from "../../utils/navRoutesGenerator";
import mainRoutes from "../../routes/mainRoutes";
const navItems = navRouteGenerator(mainRoutes);

const Navbar = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      items={navItems}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};

export default Navbar;
