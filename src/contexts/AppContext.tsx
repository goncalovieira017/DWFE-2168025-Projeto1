import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, User, AIResponse, AIStats } from '../types';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  history: AIResponse[];
  addHistory: (item: AIResponse) => void;
  stats: AIStats;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('aura-theme');
    return (saved as Theme) || Theme.DARK;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aura-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [history, setHistory] = useState<AIResponse[]>(() => {
    const saved = localStorage.getItem('aura-history');
    return saved ? JSON.parse(saved) : [];
  });

  const [stats, setStats] = useState<AIStats>(() => {
    const saved = localStorage.getItem('aura-stats');
    return saved ? JSON.parse(saved) : { totalRequests: 0, averageResponseTime: 0, totalTokens: 0 };
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
    localStorage.setItem('aura-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const login = (name: string, email: string) => {
    const newUser = { id: Math.random().toString(36).substr(2, 9), name, email };
    setUser(newUser);
    localStorage.setItem('aura-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aura-user');
  };

  const addHistory = (item: AIResponse) => {
    const newHistory = [item, ...history];
    setHistory(newHistory.slice(0, 50)); // Limit to 50 items
    localStorage.setItem('aura-history', JSON.stringify(newHistory.slice(0, 50)));

    // Update stats
    const newTotalRequests = stats.totalRequests + 1;
    const newAvgTime = (stats.averageResponseTime * stats.totalRequests + item.loadingTime) / newTotalRequests;
    const newStats = {
      ...stats,
      totalRequests: newTotalRequests,
      averageResponseTime: newAvgTime,
    };
    setStats(newStats);
    localStorage.setItem('aura-stats', JSON.stringify(newStats));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, login, logout, history, addHistory, stats }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
