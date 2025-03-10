
import React from "react";

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ opacity: 0.6 }}
      >
        <source src="/src/ak.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </div>
  );
};

export default VideoBackground;
