
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";

interface ProjectCarouselProps {
  projects: Array<{
    name: string;
    url: string;
    description: string;
    image: string;
    icon?: React.ReactNode;
  }>;
  onProjectClick: (project: any) => void;
  loading: boolean;
}

const ProjectCarousel = ({ projects, onProjectClick, loading }: ProjectCarouselProps) => {
  if (loading) {
    return (
      <motion.div 
        className="flex justify-center items-center h-[400px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </motion.div>
    );
  }

  return (
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
              <ProjectCard 
                project={project}
                index={index}
                onProjectClick={onProjectClick}
              />
            </CarouselItem>
          ))}
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
  );
};

export default ProjectCarousel;
