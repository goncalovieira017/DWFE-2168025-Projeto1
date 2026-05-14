import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Sun, Moon, LogOut, Menu, X, Sparkles, LayoutDashboard, History, MessageSquare, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const { theme, toggleTheme, user, logout } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Chat IA', path: '/chat', icon: MessageSquare, private: true },
    { name: 'Histórico', path: '/history', icon: History, private: true },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, private: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 dark:text-blue-400">
            <Sparkles className="w-6 h-6" />
            <span>Aura AI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              (!item.private || user) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    location.pathname === item.path ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                <button
                  onClick={logout}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm">Entrar</Link>
                <Link to="/register" className="btn-primary text-sm hidden sm:block">Começar</Link>
              </div>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden bg-white dark:bg-slate-950 px-4 pt-20"
          >
            <button
              className="absolute top-4 right-4 p-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                (!item.private || user) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-2xl font-bold"
                  >
                    <item.icon className="w-8 h-8 text-blue-500" />
                    {item.name}
                  </Link>
                )
              ))}
              {!user && (
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary text-center text-lg py-4"
                >
                  Criar Conta
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-12 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
            <Sparkles className="w-6 h-6" />
            <span>Aura AI</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs">
            A próxima geração de inteligência artificial projetada para elevar sua produtividade.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Projeto I</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Desenvolvimento Web Front-End<br />
            ESTG - Universidade da Madeira<br />
            1º Ano / 2º Semestre
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Docentes</h4>
          <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-2">
            <li>Marco Olim</li>
            <li>Eduardo Teles</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
        © 2026 Aura AI - Todos os direitos reservados.
      </div>
    </footer>
  );
}
