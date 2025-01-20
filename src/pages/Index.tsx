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
      setIsTransitioning(false);
    }, 5000);
  };

  const handleOpenChat = () => {
    setTransitionType("chat");
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      navigate("/chat");
    }, 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ProjectSidebar isTransitioning={isTransitioning} />
      
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E5DEFF] to-[#FDE1D3] opacity-50" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%238B5CF6\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
          }}
        />
      </div>

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