
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Terminal, Zap, Sparkles } from "lucide-react";

interface CodeLoadingAnimationProps {
  onComplete: () => void;
}

const CodeLoadingAnimation = ({ onComplete }: CodeLoadingAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);

  const loadingSteps = [
    { text: "Инициализация системы...", icon: Terminal },
    { text: "Загрузка компонентов...", icon: Code2 },
    { text: "Подключение к GitHub API...", icon: Zap },
    { text: "Готово! Добро пожаловать!", icon: Sparkles }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < loadingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSparkles(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Main loading container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 shadow-2xl"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
            >
              <Code2 className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">A-K Project</h2>
            <p className="text-gray-400">Загрузка портфолио...</p>
          </motion.div>

          {/* Loading steps */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {loadingSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isActive || isCompleted ? 1 : 0.3,
                      x: 0,
                      scale: isActive ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-purple-600/20 border border-purple-500/50' 
                        : isCompleted 
                        ? 'bg-green-600/20 border border-green-500/50'
                        : 'bg-gray-800/50 border border-gray-700/50'
                    }`}
                  >
                    <motion.div
                      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                    >
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-purple-400' : 
                        isCompleted ? 'text-green-400' : 'text-gray-500'
                      }`} />
                    </motion.div>
                    
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-white' : 
                      isCompleted ? 'text-green-300' : 'text-gray-400'
                    }`}>
                      {step.text}
                    </span>

                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="mt-6 h-2 bg-gray-700 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
              animate={{
                background: [
                  "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                  "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                  "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Sparkles effect when complete */}
          <AnimatePresence>
            {showSparkles && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 360],
                      x: [0, Math.cos(i * 30) * 100],
                      y: [0, Math.sin(i * 30) * 100],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CodeLoadingAnimation;
