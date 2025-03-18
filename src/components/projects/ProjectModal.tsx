
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  selectedProject: {
    name: string;
    url: string;
    description: string;
    image: string;
    icon?: React.ReactNode;
  } | null;
  onClose: () => void;
}

const ProjectModal = ({ selectedProject, onClose }: ProjectModalProps) => {
  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-black/70 backdrop-blur-md text-white p-6 rounded-xl w-full max-w-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-60 mb-4 overflow-hidden rounded-lg">
            <motion.img 
              src={selectedProject.image} 
              alt={selectedProject.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">{selectedProject.name}</h2>
          <p className="mb-4 text-gray-300">{selectedProject.description}</p>
          
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 px-4 py-2 rounded-md hover:bg-white/20 transition-colors"
              onClick={onClose}
            >
              Закрыть
            </motion.button>
            
            <motion.a
              href={selectedProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] px-4 py-2 rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Перейти к проекту
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
