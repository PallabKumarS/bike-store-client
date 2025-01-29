import { Menu } from "antd";
import navRouteGenerator from "../../utils/navRoutesGenerator";
import mainRoutes from "../../routes/mainRoutes";
import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const navItems = navRouteGenerator(mainRoutes, token, user);

  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[""]}
        items={navItems}
        style={{
          minWidth: 0,
          flex: 1,
        }}
      />
    </>
  );
};

export default Navbar;
