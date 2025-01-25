/* eslint-disable @typescript-eslint/no-unused-expressions */
import { notification, Spin } from "antd";

interface NotifyProps {
  destroyId?: string;
  toastId: string;
  type: "success" | "error" | "loading";
  message: string;
  description?: string;
}

const Notify = ({
  destroyId,
  toastId,
  type,
  message,
  description,
}: NotifyProps): void => {
  // Close the previous notification with the same destroyId and introduce a slight delay
  if (destroyId) {
    notification.destroy(destroyId);
    setTimeout(
      () => triggerNotification(toastId, type, message, description),
      200
    ); // Delay to allow smooth transition
  } else {
    triggerNotification(toastId, type, message, description);
  }
};

const triggerNotification = (
  toastId: string,
  type: "success" | "error" | "loading",
  message: string,
  description?: string
): void => {
  const commonProps = {
    key: toastId,
    message,
    description,
    showProgress: true,
    pauseOnHover: true,
  };

  switch (type) {
    case "success":
      notification.success(commonProps);
      break;
    case "error":
      notification.error(commonProps);
      break;
    case "loading":
      notification.info({ ...commonProps, icon: <Spin /> });
      break;
    default:
      notification.info(commonProps);
  }
};

export default Notify;
