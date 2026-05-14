import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified auth for project purposes
    login(mode === 'register' ? name : email.split('@')[0], email);
    navigate('/chat');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5 space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 font-bold text-2xl text-blue-600 dark:text-blue-400">
            <Sparkles className="w-8 h-8" />
            <span>Aura AI</span>
          </div>
          <h2 className="text-2xl font-bold">{mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
          <p className="text-slate-500 dark:text-slate-400">
            {mode === 'login' ? 'Inicie sessão para continuar conversando.' : 'Registre-se para começar sua jornada com IA.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Nome Completo</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Seu nome"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 group">
            {mode === 'login' ? 'Entrar' : 'Registrar'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            {mode === 'login' ? 'Não tem uma conta?' : 'Já possui uma conta?'}
          </span>{' '}
          <Link
            to={mode === 'login' ? '/register' : '/login'}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            {mode === 'login' ? 'Registe-se' : 'Faça Login'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
