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
import CustomFooter from "./CustomFooter";
import logo from "./../../assets/bikeStore.jpg";

const MainLayout = ({ sideBar = false }: { sideBar?: boolean }) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  return (
    <Layout
      className="mx-auto"
      style={{
        minHeight: "100%",
      }}
    >
      {sideBar && <Sidebar />}
      <Layout>
        <Header
          className="shadow-md mb-10 md:mb-0 mx-0 px-0 md:px-5 md:sticky"
          style={{
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="flex items-center justify-around gap-2">
            {!sideBar && (
              <NavLink
                to="/"
                className="text-xl font-bold text-white text-center flex items-center gap-1"
              >
                <img src={logo} className="w-10 h-10 rounded-full" />

                <h3 className="text-lg text-wrap md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Moto Horizon
                </h3>
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
        <Content style={{ minHeight: "100vh", margin: "20px 5px 0" }}>
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer>
          <CustomFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
