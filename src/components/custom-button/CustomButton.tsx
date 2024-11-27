import React from "react";
import { CustomButtonProps } from "../../types/types";

const CustomButton = ({
  width,
  height,
  textColor,
  bgColor,
  label,
  icon,
  fontSize,
  fontWeight,
  borderColor,
  borderWidth,
  borderRadius,
  onClick,
  disabled
}: CustomButtonProps) => {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        gap: "8px",
        width: width || "92px",
        height: height || "37px",
        backgroundColor: disabled ? '#8E8E8E' : bgColor,
        borderRadius: borderRadius || '10px',
        fontSize: fontSize || '12px',
        fontWeight: fontWeight || 400,
        color: textColor,
        outline: "none",
        borderStyle: "solid",
        borderColor: borderColor || "",
        borderWidth: borderWidth || "0px",
        cursor: disabled ? "": "pointer",
      }}
    onClick={onClick}
    disabled = {disabled}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default CustomButton;
