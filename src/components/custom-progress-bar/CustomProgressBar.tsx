import React from "react";
import "./CustomProgressBar.css";

const CustomProgressBar = ({
  progress,
}: {
  progress: string;
}) => {
  const Parentdiv = {
    height: "10px",
    width: "235px",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    marginLeft: '20px',
    marginRight:'20px'
  };

  const Childdiv: React.CSSProperties = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: '#084c3f',
    borderRadius: 40,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}></div>
    </div>
  );
};

export default CustomProgressBar;
