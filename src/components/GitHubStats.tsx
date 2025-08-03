import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, Star, GitBranch, Eye, Calendar, MapPin, Users, Link } from "lucide-react";

interface GitHubStatsProps {
  username: string;
}

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  avatar_url: string;
  created_at: string;
}

const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user');
  }
  return response.json();
};

const GitHubStats = ({ username }: GitHubStatsProps) => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['github-user', username],
    queryFn: () => fetchGitHubUser(username),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
          />
        </div>
      </motion.div>
    );
  }

  if (error || !user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900/50 backdrop-blur-sm border border-red-500/50 rounded-xl p-6"
      >
        <p className="text-red-400 text-center">Ошибка загрузки данных GitHub</p>
      </motion.div>
    );
  }

  const stats = [
    { label: "Репозитории", value: user.public_repos, icon: Github, color: "text-blue-400" },
    { label: "Подписчики", value: user.followers, icon: Users, color: "text-green-400" },
    { label: "Подписки", value: user.following, icon: Eye, color: "text-purple-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <motion.img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="w-16 h-16 rounded-full border-2 border-purple-500/50"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div>
          <h3 className="text-xl font-bold text-white">{user.name || user.login}</h3>
          <p className="text-gray-400">@{user.login}</p>
          {user.bio && (
            <p className="text-gray-300 text-sm mt-1">{user.bio}</p>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"
          >
            <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Additional info */}
      <div className="space-y-2">
        {user.location && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            <MapPin className="w-4 h-4 text-red-400" />
            <span>{user.location}</span>
          </motion.div>
        )}
        
        {user.blog && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            <Link className="w-4 h-4 text-blue-400" />
            <a 
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              {user.blog}
            </a>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-gray-300"
        >
          <Calendar className="w-4 h-4 text-green-400" />
          <span>Присоединился {new Date(user.created_at).toLocaleDateString('ru-RU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </motion.div>
      </div>

      {/* GitHub link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6"
      >
        <a
          href={`https://github.com/${user.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        >
          <Github className="w-4 h-4" />
          Открыть профиль GitHub
        </a>
      </motion.div>
    </motion.div>
  );
};

export default GitHubStats; 