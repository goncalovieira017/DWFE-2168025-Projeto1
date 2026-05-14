import React from 'react';
import { useApp } from '../contexts/AppContext';
import { motion } from 'motion/react';
import { LayoutDashboard, Zap, Clock, Activity, BarChart3, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { stats, history } = useApp();

  const metrics = [
    {
      title: 'Total de Pedidos',
      value: stats.totalRequests,
      icon: Activity,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      label: 'Requisições feitas à API'
    },
    {
      title: 'Tempo Médio',
      value: `${(stats.averageResponseTime / 1000).toFixed(2)}s`,
      icon: Clock,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
      label: 'Latência média de resposta'
    },
    {
      title: 'Atividade Recente',
      value: history.filter(h => h.timestamp > Date.now() - 24 * 60 * 60 * 1000).length,
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30',
      label: 'Pedidos nas últimas 24h'
    },
    {
      title: 'Modelo Utilizado',
      value: 'Gemini 3',
      icon: Zap,
      color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
      label: 'Motor de IA atual'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Utilização</h1>
          <p className="text-slate-500">Métricas e estatísticas em tempo real da sua conta.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{metric.title}</p>
              <h3 className="text-2xl font-bold">{metric.value}</h3>
              <p className="text-xs text-slate-400">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 h-80 flex flex-col items-center justify-center text-center space-y-4 opacity-50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5">
             <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>
          <BarChart3 className="w-16 h-16" />
          <div>
            <h4 className="font-bold text-lg">Gráfico de Atividade</h4>
            <p className="text-sm">Os dados de volume serão exibidos aqui conforme sua utilização aumentar.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white space-y-6 flex flex-col justify-between shadow-xl shadow-blue-500/20">
          <div>
            <h4 className="text-xl font-bold mb-2">Plano Estudante</h4>
            <p className="text-blue-100 text-sm">Aproveite todo o potencial da IA com acesso prioritário.</p>
          </div>
          <div className="space-y-4">
             <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[65%]" />
             </div>
             <p className="text-xs font-medium uppercase tracking-widest text-blue-200">65% da quota utilizada</p>
          </div>
          <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
            Gerir Plano
          </button>
        </div>
      </div>
    </div>
  );
}
