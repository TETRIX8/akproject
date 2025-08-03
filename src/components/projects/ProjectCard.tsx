
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code, MousePointer, ExternalLink, Star, GitBranch } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface ProjectCardProps {
  project: {
    name: string;
    url: string;
    description: string;
    image: string;
    icon?: React.ReactNode;
    stars?: number;
    forks?: number;
    language?: string;
  };
  index: number;
  onProjectClick: (project: any) => void;
}

const ProjectCard = ({ project, index, onProjectClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.03,
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onProjectClick(project)}
      className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10"
        animate={{
          background: isHovered 
            ? "linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2), rgba(236, 72, 153, 0.2))"
            : "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))"
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Parallax image effect */}
      <motion.div 
        className="w-full h-full overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Shimmer effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: isHovered ? ["-100%", "100%"] : ["-100%", "-100%"]
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Enhanced project info overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          {/* Header with icon and title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg"
              >
                {project.icon || <Code className="h-5 w-5 text-purple-400" />}
              </motion.div>
              <h3 className="text-white text-xl font-bold group-hover:text-purple-300 transition-colors">
                {project.name}
              </h3>
            </div>
            
            {/* External link indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink className="h-4 w-4 text-white/60" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Stats row */}
          {(project.stars || project.forks || project.language) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center gap-4 text-xs text-white/60"
            >
              {project.stars && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span>{project.stars}</span>
                </div>
              )}
              {project.forks && (
                <div className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3 text-blue-400" />
                  <span>{project.forks}</span>
                </div>
              )}
              {project.language && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span>{project.language}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              Открыть проект
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Floating interaction hint */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full"
          >
            <MousePointer className="h-4 w-4 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered 
            ? "0 0 30px rgba(139, 92, 246, 0.3)" 
            : "0 0 0px rgba(139, 92, 246, 0)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
