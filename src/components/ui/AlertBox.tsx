import { Modal } from "antd";
import { MouseEventHandler } from "react";
import { FaExclamationCircle } from "react-icons/fa";

const { confirm } = Modal;

export const showDeleteConfirm = (
  message?: string,
  description?: string,
  onClick?: MouseEventHandler<HTMLElement> | undefined
) => {
  confirm({
    title: <p>{message || "Do you want to delete these item ?"}</p>,
    icon: (
      <FaExclamationCircle
        style={{
          textAlign: "center",
          color: "red",
          fontSize: "1.5rem",
          alignItems: "center",
          marginRight: "1rem",
        }}
      />
    ),
    content: description || "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      if (onClick) {
        onClick({} as React.MouseEvent<HTMLElement>);
      }
    },
  });
};
