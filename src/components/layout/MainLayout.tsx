import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import { NavLink, Outlet } from "react-router-dom";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Sidebar from "./Sidebar";

const MainLayout = ({ sideBar = false }: { sideBar?: boolean }) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {sideBar && <Sidebar />}
      <Layout>
        <Header className="" style={{}}>
          <div className="flex justify-center items-center md:justify-around gap-2">
            {!sideBar && (
              <NavLink
                to="/"
                className="text-xl font-bold text-white text-center"
              >
                Bike Store
              </NavLink>
            )}
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
        <Content style={{ minHeight: "100vh", margin: "20px 35px 0" }}>
          <div>
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

export default MainLayout;
