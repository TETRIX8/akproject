import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const projects = [
  {
    name: "Фильмы через Telegram",
    url: "https://t.me/Kambekevloevfilm_bot",
    description: "Бот для просмотра фильмов через сайт",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Фильмы в Telegram",
    url: "https://t.me/Filmtests06_bot?start=997_5698570",
    description: "Бот для просмотра через телеграм (партнерские)",
    color: "from-blue-500 to-teal-500"
  },
  {
    name: "AK WhatsApp",
    url: "https://t.me/akwhatsApp_bot",
    description: "WhatsApp мод",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Пробив Бот",
    url: "https://t.me/Rybsr_bot",
    description: "Бот для пробива",
    color: "from-orange-500 to-red-500"
  },
  {
    name: "AK Generate",
    url: "http://akgenerate.lovable.app",
    description: "Сайт для генерации изображения",
    color: "from-indigo-500 to-purple-500"
  }
];

export function ProjectSlider() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const startRoulette = () => {
    setIsSpinning(true);
    const spins = 2 + Math.floor(Math.random() * 3); // 2-4 full spins
    const finalIndex = Math.floor(Math.random() * projects.length);
    
    // Calculate total rotation including full spins and final position
    const totalRotations = (spins * projects.length + finalIndex) * (360 / projects.length);
    
    // After animation completes
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedIndex(finalIndex);
    }, 3000);
  };

  return (
    <div className="w-full max-w-5xl px-4">
      <button
        onClick={startRoulette}
        disabled={isSpinning}
        className="mb-8 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full 
                 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Крутить рулетку
      </button>

      <Carousel className="w-full">
        <CarouselContent>
          <AnimatePresence>
            {projects.map((project, index) => (
              <CarouselItem key={project.url} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: isSpinning ? [0, 360 * 3] : 0,
                    scale: selectedIndex === index ? 1.1 : 1,
                  }}
                  transition={{
                    duration: isSpinning ? 3 : 0.5,
                    delay: index * 0.1,
                    rotate: {
                      type: "spring",
                      damping: 10,
                    },
                    scale: {
                      duration: 0.3
                    }
                  }}
                  whileHover={{ scale: isSpinning ? 1 : 1.05, y: -5 }}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    onClick={(e) => {
                      if (isSpinning) e.preventDefault();
                    }}
                  >
                    <div className={`relative h-[200px] rounded-xl p-6 overflow-hidden bg-gradient-to-br ${project.color} 
                                  ${isSpinning ? 'cursor-not-allowed' : ''}`}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10" />
                      
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                          <p className="text-white/80 text-sm">{project.description}</p>
                        </div>
                        
                        <ExternalLink className="text-white/80 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              </CarouselItem>
            ))}
          </AnimatePresence>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}