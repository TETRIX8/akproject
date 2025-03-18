
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Code, Heart, GraduationCap, ArrowRight, MousePointer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useToast } from "@/components/ui/use-toast";

const projects = [
  {
    name: "Фильмы через Telegram",
    url: "https://t.me/Kambekevloevfilm_bot",
    description: "Бот для просмотра фильмов через сайт",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Фильмы в Telegram",
    url: "https://t.me/Filmtests06_bot?start=997_5698570",
    description: "Бот для просмотра через телеграм (партнерские)",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "AK WhatsApp",
    url: "https://t.me/akwhatsApp_bot",
    description: "WhatsApp мод",
    image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Пробив Бот",
    url: "https://t.me/Rybsr_bot",
    description: "Бот для пробива",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2069&auto=format&fit=crop"
  },
  {
    name: "AK Generate",
    url: "http://akgenerate.lovable.app",
    description: "Сайт для генерации изображения",
    image: "https://pisatel.info/wp-content/uploads/2023/05/%D0%93%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9-%D0%BF%D0%BE-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D1%83-%D0%B8-%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D1%8E-%D0%BD%D0%B5%D0%B9%D1%80%D0%BE%D1%81%D0%B5%D1%82%D1%8C.webp"
  },
  {
    name: "Evloev Film",
    url: "http://evloevfilm.lovable.app",
    description: "Сайт для просмотра фильмов",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "AK VPN",
    url: "http://akvpn.lovable.app",
    description: "VPN сервис",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop"
  },
  // New projects added below
  {
    name: "Python Обучение",
    url: "https://python.lovable.app/",
    description: "Сайт для изучения Python",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3543&auto=format&fit=crop"
  },
  {
    name: "МКСУ Колледж",
    url: "https://moksu.lovable.app/",
    description: "Сайт для колледжа",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3882&auto=format&fit=crop"
  },
  {
    name: "AK GPT",
    url: "https://akgpt.lovable.app/",
    description: "Чат GPT проект",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=5530&auto=format&fit=crop"
  },
  {
    name: "AK DeepSeek",
    url: "https://akdeepseek.lovable.app/",
    description: "Чат с DeepSeek",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Обучение базовым знаниям ПК",
    url: "https://akbasicpk.netlify.app/",
    description: "Сайт для обучения базовым знаниям ПК",
    image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=2076&auto=format&fit=crop",
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    name: "GitHub Tetrix8",
    url: "https://github.com/tetrix8",
    description: "Мой GitHub профиль",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
    icon: <Github className="h-5 w-5" />
  },
  {
    name: "Донат",
    url: "https://www.tinkoff.ru/rm/evloev.abdul_kadyr1/JLhgH6880",
    description: "Поддержать проект",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop",
    icon: <Heart className="h-5 w-5 text-red-500" />
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [exitingPage, setExitingPage] = useState(false);
  const { scrollYProgress } = useScroll();
  const { toast } = useToast();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Detect scroll position for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  // Handle mouse move for dynamic effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth - 0.5, 
        y: e.clientY / window.innerHeight - 0.5 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle navigation with animation
  const handleNavigate = (path) => {
    setExitingPage(true);
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    toast({
      title: "Проект выбран",
      description: `Вы выбрали проект: ${project.name}`,
      duration: 3000,
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen relative overflow-hidden"
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: exitingPage ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Parallax Background Elements */}
        <motion.div 
          className="absolute inset-0 -z-5 opacity-20 pointer-events-none"
          style={{ 
            y: backgroundY,
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%238B5CF6\" fill-opacity=\"0.15\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
          }}
        />

        {/* Dynamic mouse-following element */}
        <motion.div 
          className="fixed w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none z-0"
          animate={{
            x: mousePosition.x * 100,
            y: mousePosition.y * 100,
          }}
          transition={{ type: "spring", damping: 10 }}
        />

        <div className="container mx-auto px-4 py-10 relative z-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => handleNavigate("/")} 
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

          {loading ? (
            <motion.div 
              className="flex justify-center items-center h-[400px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {projects.map((project, index) => {
                    // Use react-intersection-observer to trigger animations when scrolled into view
                    const [ref, inView] = useInView({
                      triggerOnce: true,
                      threshold: 0.1,
                    });

                    return (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                          onClick={() => handleProjectClick(project)}
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
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <div className="flex justify-center mt-8 gap-4">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CarouselPrevious className="relative static backdrop-blur-sm bg-white/10" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <CarouselNext className="relative static backdrop-blur-sm bg-white/10" />
                  </motion.div>
                </div>
              </Carousel>
            </motion.div>
          )}
        </div>

        {/* Selected project detail modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
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
                    onClick={() => setSelectedProject(null)}
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
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default Projects;
