import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CustomToast.css"; // Optional, if you want to add your own styles

type ToastType = "success" | "error" | "info" | "warning";

interface CustomToastProps {
  message: string;
  type?: ToastType; // Default is "info"
}

export const showCustomToast = ({ message, type }: CustomToastProps) => {
  switch (type) {
    case "success":
      toast(message, {
        className: "success_toast",
      });
      break;
    case "error":
      toast(message, { className: "error_toast" });
      break;
    default:
    //   toast(message, { autoClose: 3000 });
  }
};
