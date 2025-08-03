import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Github, GraduationCap, Heart, Code2, Star, GitBranch } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the new components
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import ProjectModal from "@/components/projects/ProjectModal";
import ParallaxBackground from "@/components/projects/ParallaxBackground";
import GitHubProjects from "@/components/GitHubProjects";
import GitHubStats from "@/components/GitHubStats";
import { useMousePosition } from "@/hooks/useMousePosition";

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
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [exitingPage, setExitingPage] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const { toast } = useToast();
  const containerRef = useRef(null);
  
  // Use the mouse position hook
  const mousePosition = useMousePosition();

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
    window.navigateWithLoading(path);
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

  // Handle GitHub project click
  const handleGitHubProjectClick = (repo) => {
    setSelectedProject({
      name: repo.name,
      url: repo.html_url,
      description: repo.description || "Описание отсутствует",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count
    });
    toast({
      title: "GitHub проект выбран",
      description: `Вы выбрали проект: ${repo.name}`,
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
        <ParallaxBackground mousePosition={mousePosition} />

        <div className="container mx-auto px-4 py-10 relative z-10">
          <ProjectHeader onNavigate={handleNavigate} />

          {/* Enhanced tabs with animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                <TabsTrigger 
                  value="personal" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  Мои проекты
                </TabsTrigger>
                <TabsTrigger 
                  value="github"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCarousel 
                    projects={projects} 
                    onProjectClick={handleProjectClick} 
                    loading={loading} 
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="github" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-3xl font-bold text-center mb-4 gradient-text"
                    >
                      Мои GitHub проекты
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-center text-gray-300 mb-8"
                    >
                      Изучите мои открытые проекты на GitHub
                    </motion.p>
                  </div>
                  
                  {/* GitHub Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mb-8"
                  >
                    <GitHubStats username="tetrix8" />
                  </motion.div>
                  
                  <GitHubProjects 
                    username="tetrix8" 
                    onProjectClick={handleGitHubProjectClick}
                  />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        <ProjectModal 
          selectedProject={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Projects;
