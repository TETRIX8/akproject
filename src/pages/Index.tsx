import { ProjectSidebar } from "@/components/ProjectSidebar";
import { Code, ExternalLink } from "lucide-react";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ProjectSidebar />
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 animate-fade-in">
            A-K Project
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in delay-100">
            <div className="p-6 bg-secondary/50 rounded-lg backdrop-blur-sm hover:scale-105 transition-transform">
              <Code className="h-8 w-8 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">A-K Project</h2>
              <p className="text-muted-foreground">
                Создаю уникальные проекты и решения
              </p>
            </div>
            
            <div className="p-6 bg-secondary/50 rounded-lg backdrop-blur-sm hover:scale-105 transition-transform">
              <ExternalLink className="h-8 w-8 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Проекты</h2>
              <p className="text-muted-foreground">
                Откройте меню слева, чтобы увидеть мои проекты
              </p>
            </div>
          </div>

          <div className="animate-bounce mt-12">
            <button
              onClick={() => document.querySelector('button')?.click()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              Открыть меню
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;