
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProjectHeaderProps {
  onNavigate: (path: string) => void;
}

const ProjectHeader = ({ onNavigate }: ProjectHeaderProps) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={() => onNavigate("/")} 
          variant="outline" 
          className="mb-6 flex items-center gap-2 backdrop-blur-sm bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Button>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
      >
        Наши проекты
      </motion.h1>
    </>
  );
};

export default ProjectHeader;
