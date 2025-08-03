
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Star, GitBranch, Calendar, Code2, Globe } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProjectModalProps {
  selectedProject: any;
  onClose: () => void;
}

const ProjectModal = ({ selectedProject, onClose }: ProjectModalProps) => {
  if (!selectedProject) return null;

  return (
    <Dialog open={!!selectedProject} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-0 overflow-hidden">
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-700/50 hover:bg-gray-700/80 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Project image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative h-64 overflow-hidden"
              >
                <motion.img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                
                {/* Project title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    {selectedProject.name}
                  </motion.h2>
                  
                  {selectedProject.language && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600/20 backdrop-blur-sm rounded-full border border-purple-500/50"
                    >
                      <Code2 className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-300">{selectedProject.language}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Project content */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Описание</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Stats */}
                  {(selectedProject.stars || selectedProject.forks) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex items-center gap-6"
                    >
                      {selectedProject.stars && (
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <span className="text-white font-medium">{selectedProject.stars}</span>
                          <span className="text-gray-400 text-sm">звезд</span>
                        </div>
                      )}
                      
                      {selectedProject.forks && (
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-5 h-5 text-blue-400" />
                          <span className="text-white font-medium">{selectedProject.forks}</span>
                          <span className="text-gray-400 text-sm">форков</span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Technologies */}
                  {selectedProject.technologies && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">Технологии</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string, index: number) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                            className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-gray-700/50"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Features */}
                  {selectedProject.features && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">Возможности</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature: string, index: number) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                            className="flex items-center gap-2 text-gray-300"
                          >
                            <div className="w-2 h-2 bg-purple-500 rounded-full" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex gap-4 pt-4"
                  >
                    <motion.a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    >
                      <Globe className="w-4 h-4" />
                      Открыть проект
                    </motion.a>
                    
                    {selectedProject.github && (
                      <motion.a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-200"
                      >
                        <Code2 className="w-4 h-4" />
                        Код на GitHub
                      </motion.a>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
