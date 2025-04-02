
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { motion } from "framer-motion";
import { Code2, MessageSquareText } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<"projects" | "chat" | null>(null);

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
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
        >
          A-K Project
        </motion.h1>

        <div className="flex flex-col gap-4">
          <motion.button
            onClick={handleOpenMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Code2 className="w-5 h-5" />
            <span className="text-lg font-medium">Проекты</span>
          </motion.button>

          <motion.button
            onClick={handleOpenChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageSquareText className="w-5 h-5" />
            <span className="text-lg font-medium">AK Chat</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Index;
