
import { Code, Github, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectProps {
  project: {
    name: string;
    url: string;
    description: string;
    image: string;
    icon?: React.ReactNode;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-[400px] rounded-xl overflow-hidden group relative"
    >
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
        <div className="flex items-center gap-2 mb-2">
          {project.icon || <Code className="h-5 w-5 text-white" />}
          <h3 className="text-white text-xl font-bold">{project.name}</h3>
        </div>
        <p className="text-white/80 mb-4">{project.description}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-md transition-colors inline-block text-center"
        >
          Открыть проект
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
