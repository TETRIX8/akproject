
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, MessageSquareText, Github, Sparkles, Zap, Star } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<"projects" | "chat" | null>(null);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    // Trigger sparkles effect after initial load
    const timer = setTimeout(() => {
      setShowSparkles(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenMenu = () => {
    setTransitionType("projects");
    setIsTransitioning(true);
    window.navigateWithLoading("/projects");
  };

  const handleOpenChat = () => {
    setTransitionType("chat");
    setIsTransitioning(true);
    window.navigateWithLoading("/chat");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ProjectSidebar isTransitioning={isTransitioning} />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        {/* Main title with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              background: [
                "linear-gradient(45deg, #8B5CF6, #D946EF)",
                "linear-gradient(45deg, #D946EF, #3B82F6)",
                "linear-gradient(45deg, #3B82F6, #8B5CF6)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block p-1 rounded-2xl mb-4"
          >
            <div className="bg-gray-900 rounded-xl px-8 py-4">
              <motion.h1 
                className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
                animate={{
                  background: [
                    "linear-gradient(45deg, #8B5CF6, #D946EF)",
                    "linear-gradient(45deg, #D946EF, #3B82F6)",
                    "linear-gradient(45deg, #3B82F6, #8B5CF6)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundClip: "text", WebkitBackgroundClip: "text" }}
              >
                A-K Project
              </motion.h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Добро пожаловать в мое портфолио разработчика
          </motion.p>
        </motion.div>

        {/* Floating icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center gap-8 mb-8"
        >
          {[Code2, Github, Zap, Star].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: index * 0.5 
              }}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <Icon className="w-6 h-6 text-purple-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Action buttons with enhanced animations */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col gap-6 max-w-md w-full"
        >
          <motion.button
            onClick={handleOpenMenu}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <Code2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-semibold">Мои проекты</span>
            
            {/* Sparkle effect on hover */}
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
            >
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.button>

          <motion.button
            onClick={handleOpenChat}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            />
            
            <MessageSquareText className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-semibold">AK Chat</span>
          </motion.button>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex items-center gap-8 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>10+ проектов</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>5+ технологий</span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-purple-400" />
            <span>GitHub активность</span>
          </div>
        </motion.div>

        {/* Sparkles effect */}
        <AnimatePresence>
          {showSparkles && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 200],
                    y: [0, (Math.random() - 0.5) * 200],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
