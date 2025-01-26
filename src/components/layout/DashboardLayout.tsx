import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";

const DashboardLayout = () => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}>
          <div className="flex justify-center items-center md:justify-around gap-2">
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
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
