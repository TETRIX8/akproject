
import { Menu, X, Github, Code, Mail, Heart, MoreVertical, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    name: "Фильмы через Telegram",
    url: "https://t.me/Kambekevloevfilm_bot",
    description: "Бот для просмотра фильмов через сайт"
  },
  {
    name: "Фильмы в Telegram",
    url: "https://t.me/Filmtests06_bot?start=997_5698570",
    description: "Бот для просмотра через телеграм (партнерские)"
  },
  {
    name: "AK WhatsApp",
    url: "https://t.me/akwhatsApp_bot",
    description: "WhatsApp мод"
  },
  {
    name: "Пробив Бот",
    url: "https://t.me/Rybsr_bot",
    description: "Бот для пробива"
  },
  {
    name: "AK Generate",
    url: "http://akgenerate.lovable.app",
    description: "Сайт для генерации изображения"
  },
  {
    name: "Evloev Film",
    url: "http://evloevfilm.lovable.app",
    description: "Сайт для просмотра фильмов"
  },
  {
    name: "AK VPN",
    url: "http://akvpn.lovable.app",
    description: "VPN сервис"
  },
  // New projects added below
  {
    name: "Python Обучение",
    url: "https://python.lovable.app/",
    description: "Сайт для изучения Python"
  },
  {
    name: "МКСУ Колледж",
    url: "https://moksu.lovable.app/",
    description: "Сайт для колледжа"
  },
  {
    name: "AK GPT",
    url: "https://akgpt.lovable.app/",
    description: "Чат GPT проект"
  },
  {
    name: "AK DeepSeek",
    url: "https://akdeepseek.lovable.app/",
    description: "Чат с DeepSeek"
  },
  {
    name: "Обучение базовым знаниям ПК",
    url: "https://akbasicpk.netlify.app/",
    description: "Сайт для обучения базовым знаниям ПК",
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    name: "GitHub Tetrix8",
    url: "https://github.com/tetrix8",
    description: "Мой GitHub профиль",
    icon: <Github className="h-5 w-5" />
  },
  {
    name: "Донат",
    url: "https://www.tinkoff.ru/rm/evloev.abdul_kadyr1/JLhgH6880",
    description: "Поддержать проект",
    icon: <Heart className="h-5 w-5 text-red-500" />
  }
];

interface ProjectSidebarProps {
  isTransitioning?: boolean;
}

export function ProjectSidebar({ isTransitioning = false }: ProjectSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (isTransitioning) {
      setTimeout(() => {
        setIsOpen(true);
      }, 5000);
    }
  }, [isTransitioning]);

  const handleSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await emailjs.send(
        'service_vcaxptx',
        'template_91c1fvw',
        {
          from_email: email,
          message: message,
        },
        'aoak44iftoobsH4Xm'
      );

      toast({
        title: "Сообщение отправлено",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      setEmail("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-full bg-background/50 p-2 backdrop-blur-sm transition-all hover:bg-background/80"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-80 transform bg-background/95 transition-transform duration-300 ease-in-out overflow-y-auto backdrop-blur-lg border-r border-primary/20",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mt-16 flex flex-col gap-2 p-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
          >
            A-K Project
          </motion.h2>
          
          {projects.map((project, index) => (
            <motion.a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                {project.icon}
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.description}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="mb-4 text-xl font-bold flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Тех поддержка
            </h3>
            <form onSubmit={handleSupport} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                required
                className="w-full px-3 py-2 bg-secondary rounded-md"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ваше сообщение"
                required
                className="w-full px-3 py-2 bg-secondary rounded-md h-32"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Отправить
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
