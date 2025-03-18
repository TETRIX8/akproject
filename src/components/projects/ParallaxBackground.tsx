
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

interface ParallaxBackgroundProps {
  mousePosition: { x: number; y: number };
}

const ParallaxBackground = ({ mousePosition }: ParallaxBackgroundProps) => {
  const { scrollYProgress } = useScroll();
  
  // Detect scroll position for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  return (
    <>
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 -z-5 opacity-20 pointer-events-none"
        style={{ 
          y: backgroundY,
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%238B5CF6\" fill-opacity=\"0.15\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
        }}
      />

      {/* Dynamic mouse-following element */}
      <motion.div 
        className="fixed w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * 100,
          y: mousePosition.y * 100,
        }}
        transition={{ type: "spring", damping: 10 }}
      />
    </>
  );
};

export default ParallaxBackground;
