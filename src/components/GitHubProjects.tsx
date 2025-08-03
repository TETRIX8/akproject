import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, GitBranch, Eye, Calendar, Code2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  homepage?: string;
}

interface GitHubProjectsProps {
  username: string;
  onProjectClick?: (repo: GitHubRepo) => void;
}

const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repos');
  }
  return response.json();
};

const GitHubProjects = ({ username, onProjectClick }: GitHubProjectsProps) => {
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['github-repos', username],
    queryFn: () => fetchGitHubRepos(username),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Ошибка загрузки проектов GitHub</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {repos?.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
            }}
            className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {repo.name}
                  </h3>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Code2 className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {repo.description || "Описание отсутствует"}
              </p>

              {/* Language and stats */}
              <div className="space-y-3">
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span className="text-sm text-gray-300">{repo.language}</span>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-3 w-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{repo.watchers_count}</span>
                  </div>
                </div>

                {/* Updated date */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>Обновлено {new Date(repo.updated_at).toLocaleDateString('ru-RU')}</span>
                </div>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onProjectClick?.(repo)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  Подробнее
                </motion.button>
                {repo.homepage && (
                  <motion.a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border border-purple-500/50 text-purple-300 rounded-lg text-sm hover:bg-purple-500/20 transition-all duration-200"
                  >
                    Демо
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GitHubProjects; 