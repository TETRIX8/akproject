
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Chat from "./pages/Chat";
import TunnelBackground from "./components/TunnelBackground";
import CodeLoadingAnimation from "./components/CodeLoadingAnimation";

const queryClient = new QueryClient();

// Router wrapper component to handle transitions
const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);

  // Effect to handle page transitions
  useEffect(() => {
    // Skip initial load
    const handleNavigation = (to: string) => {
      if (location.pathname === to) return;
      
      setIsLoading(true);
      setNextPath(to);
    };

    // Add navigate methods to window for global access
    window.navigateWithLoading = handleNavigation;

    return () => {
      // @ts-ignore
      window.navigateWithLoading = undefined;
    };
  }, [location.pathname]);

  // Handle loading completion
  const handleLoadingComplete = () => {
    if (nextPath) {
      navigate(nextPath);
      setNextPath(null);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <CodeLoadingAnimation onComplete={handleLoadingComplete} />}
      <TunnelBackground />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

// Update navigation window type
declare global {
  interface Window {
    navigateWithLoading: (path: string) => void;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
