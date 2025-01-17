import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  }
];

export function ProjectSidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
          "fixed left-0 top-0 z-40 h-full w-80 transform bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mt-16 flex flex-col gap-2 p-4">
          <h2 className="mb-4 text-2xl font-bold">Мои проекты</h2>
          {projects.map((project) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link"
            >
              <div>
                <div className="font-medium">{project.name}</div>
                <div className="text-sm text-muted-foreground">
                  {project.description}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}