import { ProjectSidebar } from "@/components/ProjectSidebar";
import { motion } from "framer-motion";
import { Code2, MessageSquareText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<"projects" | "chat" | null>(null);
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    setTransitionType("projects");
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/projects");
      setIsTransitioning(false);
    }, 5000);
  };

  const handleOpenChat = () => {
    setTransitionType("chat");
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/chat");
      setIsTransitioning(false);
    }, 5000);
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

      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center">
          <div className="code-block">
            {transitionType === "chat" ? (
              <>
                <div className="code-line" style={{ animationDelay: '0.5s' }}>
                  <span className="text-blue-400">from</span>
                  <span className="text-green-400"> gemini</span>
                  <span className="text-white"> import</span>
                  <span className="text-yellow-400"> GenerativeModel</span>
                </div>
                <div className="code-line" style={{ animationDelay: '1s' }}>
                  <span className="text-blue-400">def</span>
                  <span className="text-green-400"> initialize_chat</span>
                  <span className="text-yellow-400">()</span>:
                </div>
                <div className="code-line" style={{ animationDelay: '1.5s' }}>
                  <span className="text-purple-400">    model</span> = 
                  <span className="text-green-400">GenerativeModel</span>
                  <span className="text-yellow-400">(</span>
                  <span className="text-green-400">"gemini-pro"</span>
                  <span className="text-yellow-400">)</span>
                </div>
                <div className="code-line" style={{ animationDelay: '2s' }}>
                  <span className="text-purple-400">    chat</span> = 
                  <span className="text-green-400">model.start_chat</span>
                  <span className="text-yellow-400">()</span>
                </div>
                <div className="code-line" style={{ animationDelay: '2.5s' }}>
                  <span className="text-blue-400">    return</span>
                  <span className="text-purple-400"> chat</span>
                </div>
              </>
            ) : (
              <>
                <div className="code-line" style={{ animationDelay: '0.5s' }}>
                  <span className="text-blue-400">def</span>
                  <span className="text-green-400"> load_project</span>
                  <span className="text-yellow-400">(</span>name: str<span className="text-yellow-400">)</span>:
                </div>
                <div className="code-line" style={{ animationDelay: '1s' }}>
                  <span className="text-purple-400">    print</span>
                  <span className="text-yellow-400">(</span>
                  <span className="text-green-400">"Initializing A-K Project..."</span>
                  <span className="text-yellow-400">)</span>
                </div>
                <div className="code-line" style={{ animationDelay: '1.5s' }}>
                  <span className="text-purple-400">    time.sleep</span>
                  <span className="text-yellow-400">(</span>2<span className="text-yellow-400">)</span>
                </div>
                <div className="code-line" style={{ animationDelay: '2s' }}>
                  <span className="text-blue-400">    return</span> {"{"}
                </div>
                <div className="code-line" style={{ animationDelay: '2.5s' }}>
                  <span className="text-green-400">        "status": "loading",</span>
                </div>
                <div className="code-line" style={{ animationDelay: '3s' }}>
                  <span className="text-green-400">        "project": "A-K Project",</span>
                </div>
                <div className="code-line" style={{ animationDelay: '3.5s' }}>
                  <span className="text-green-400">        "progress": "100%"</span>
                </div>
                <div className="code-line" style={{ animationDelay: '4s' }}>
                  {"    }"}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
