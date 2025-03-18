
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, MousePointer } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface ProjectCardProps {
  project: {
    name: string;
    url: string;
    description: string;
    image: string;
    icon?: React.ReactNode;
  };
  index: number;
  onProjectClick: (project: any) => void;
}

const ProjectCard = ({ project, index, onProjectClick }: ProjectCardProps) => {
  // Use react-intersection-observer to trigger animations when scrolled into view
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onProjectClick(project)}
      className="h-[400px] rounded-xl overflow-hidden group relative cursor-pointer"
    >
      {/* Parallax image effect on hover */}
      <motion.div 
        className="w-full h-full overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
      
      {/* Project info overlay with improved hover animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6"
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            {project.icon || <Code className="h-5 w-5 text-white" />}
            <h3 className="text-white text-xl font-bold">{project.name}</h3>
          </div>
          <p className="text-white/80 mb-4">{project.description}</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-md transition-colors inline-flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              Открыть проект
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Interaction hint */}
      <motion.div 
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <MousePointer className="h-4 w-4 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
