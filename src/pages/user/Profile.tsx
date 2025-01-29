/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Tag, Divider, Image } from "antd";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { TUserData } from "@/types/user.type";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import CustomForm from "@/components/form/CustomForm";
import CustomPassword from "@/components/form/CustomPassword";
import Notify from "@/components/ui/Notify";
import { TResponse } from "@/types/global.type";

const Profile = ({ userData }: { userData: TUserData }) => {
  const [changePassword] = useChangePasswordMutation();

  const handlePasswordChange: SubmitHandler<FieldValues> = async (data) => {
    Notify({
      toastId: "1",
      type: "loading",
      message: "Changing Password...",
    });

    try {
      const res = (await changePassword(data)) as TResponse<any>;
      console.log(res);
      if (res.data) {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "success",
          message: res?.data?.message || "Password Changed",
        });
      } else {
        Notify({
          destroyId: "1",
          toastId: "2",
          type: "error",
          message: res?.error?.data?.message || "Something went wrong!",
        });
      }
    } catch (err: any) {
      Notify({
        destroyId: "1",
        toastId: "2",
        type: "error",
        message: err?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4"
    >
      <Card className="shadow-2xl rounded-3xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-10 text-white relative overflow-auto">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userData?.name}</h1>
              <Tag color="purple" className="text-sm px-4 py-1">
                {userData?.role.toUpperCase()}
              </Tag>
            </div>

            {/* Account Creation Date */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="md:col-span-2 bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FaCalendarAlt className="text-2xl text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Account Created</p>
                  <p className="font-medium text-gray-800">
                    {new Date(userData?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Account Details
              </h3>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FaEnvelope className="text-2xl text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium text-gray-800">{userData?.email}</p>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FaShieldAlt className="text-2xl text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">User ID</p>
                  <p className="font-medium text-gray-800">
                    {userData?.userId}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Status Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6 bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Account Status
              </h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <Tag
                  color={userData?.status === "active" ? "green" : "red"}
                  className="px-6 py-2 text-sm rounded-full"
                >
                  {userData?.status === "active" ? "Active" : "Deactivated"}
                </Tag>
                {userData?.passwordChangedAt && (
                  <Tag
                    color="purple"
                    className="px-6 py-2 text-sm rounded-full flex items-center gap-2"
                  >
                    <FaCheckCircle /> Password Updated
                  </Tag>
                )}
              </div>
              {userData?.passwordChangedAt && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-indigo-500" />
                  <p className="text-sm">
                    Last Updated:{" "}
                    {new Date(userData?.passwordChangedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </motion.div>

            {/* change password  */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="md:col-span-2 bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Change Password
              </h3>
              <CustomForm onSubmit={handlePasswordChange}>
                <CustomPassword
                  required={true}
                  name="oldPassword"
                  label="Old Password"
                />

                <CustomPassword
                  required={true}
                  name="newPassword"
                  label="New Password"
                />

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                >
                  Update Password
                </button>
              </CustomForm>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Profile;
