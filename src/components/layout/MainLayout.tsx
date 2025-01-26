import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import { NavLink, Outlet } from "react-router-dom";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const MainLayout = () => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  return (
    <Layout className="h-full">
      <Header className="" style={{}}>
        <div className="flex justify-center items-center md:justify-around gap-2">
          <h1 className="text-xl font-bold text-white text-center">
            Bike Store
          </h1>
          <Navbar />
          {token ? (
            <Button danger onClick={() => dispatch(logout())}>
              Logout
            </Button>
          ) : (
            <NavLink to="/login">
              <Button type="primary">Login</Button>
            </NavLink>
          )}
        </div>
      </Header>
      <Content style={{ height: "100%" }}>
        <div>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
