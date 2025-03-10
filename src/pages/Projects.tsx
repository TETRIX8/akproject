
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Code, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    image: "https://images.unsplash.com/photo-1655720035861-ba4755e3bb23?q=80&w=1932&auto=format&fit=crop"
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E5DEFF] to-[#FDE1D3] opacity-50" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%238B5CF6\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-10">
        <Button 
          onClick={() => navigate("/")} 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Button>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
        >
          Наши проекты
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
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
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-4">
                <CarouselPrevious className="relative static" />
                <CarouselNext className="relative static" />
              </div>
            </Carousel>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
