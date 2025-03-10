
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/projects/VideoBackground";
import ProjectsList from "@/components/projects/ProjectsList";

const Projects = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <VideoBackground />

      <div className="container mx-auto px-4 py-10">
        <Button 
          onClick={() => navigate("/")} 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Button>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
        >
          Наши проекты
        </motion.h1>

        <ProjectsList />
      </div>
    </div>
  );
};

export default Projects;
