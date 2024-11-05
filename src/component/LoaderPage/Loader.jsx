import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <video className="loader-video" autoPlay loop muted>
        <source src="https://cdn.dribbble.com/userupload/4895852/file/original-6954d6a5dd67e4fbf1c6bf2f446515be.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
