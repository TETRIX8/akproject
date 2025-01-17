import { ProjectSidebar } from "@/components/ProjectSidebar";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      <ProjectSidebar />
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Добро пожаловать</h1>
          <p className="text-xl text-muted-foreground">
            Откройте меню слева, чтобы увидеть мои проекты
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;