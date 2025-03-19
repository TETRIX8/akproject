
import React from 'react';

interface VideoBackgroundProps {
  muted?: boolean;
  onEnded?: () => void;
  autoPlay?: boolean;
}

const VideoBackground = ({ muted = true, onEnded, autoPlay = true }: VideoBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay={autoPlay}
        loop={!onEnded}
        muted={muted}
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ opacity: 0.6 }}
        onEnded={onEnded}
      >
        <source src="/src/akk.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </div>
  );
};

export default VideoBackground;
