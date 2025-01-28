/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomPassword from "@/components/form/CustomPassword";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Notify from "@/components/ui/Notify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import {
  setLoginToastId,
  setUser,
  TUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TError, TResponse } from "@/types/global.type";
import { verifyToken } from "@/utils/verifyToken";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    Notify({
      toastId: "1",
      type: "loading",
      message: "Logging in...",
    });
    dispatch(setLoginToastId("1"));

    try {
      const res = await login(data).unwrap();

      console.log(res);

      if (res?.success) {
        const user = verifyToken(res?.data?.accessToken) as TUser;
        dispatch(setUser({ user, token: res.data.accessToken }));
        navigate(`/${user?.role}/dashboard`);

        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.message || "Logged in successfully",
        });
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res?.error?.message || "Something went wrong!",
        });
      }
    } catch (err: TError | any) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: err?.data?.message || "An error occurred",
      });
    }
  };

  const handleRegister: SubmitHandler<FieldValues> = async (data) => {
    Notify({
      toastId: "1",
      type: "loading",
      message: "Registering...",
    });

    try {
      const res = (await register(data)) as TResponse<any>;

      if (res.data?.success) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "User created successfully",
        });
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (err: TError | any) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: err?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* login form here  */}
        <CustomForm onSubmit={handleLogin}>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login into your account with the following credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* email here  */}
                <div className="space-y-1">
                  <CustomInput label="Email" type="text" name="email" />
                </div>

                {/* password here  */}
                <div className="space-y-1">
                  <CustomPassword label="Password" name="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </CustomForm>

        {/* register here  */}
        <CustomForm onSubmit={handleRegister}>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* name here  */}
                <div className="space-y-1">
                  <CustomInput label="Name" type="text" name="name" />
                </div>

                {/* email here  */}
                <div className="space-y-1">
                  <CustomInput label="Email" type="text" name="email" />
                </div>

                {/* password here  */}
                <div className="space-y-1">
                  <CustomPassword label="Password" name="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </CustomForm>
      </Tabs>
    </div>
  );
};

export default Login;
