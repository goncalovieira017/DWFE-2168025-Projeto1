import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="container mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-200 dark:border-blue-800"
          >
            <Sparkles className="w-4 h-4" />
            <span>Versão 1.0 Já Disponível</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight"
          >
            Sua Mente, <span className="text-blue-600">Ampliada</span> por IA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Aura AI é a interface definitiva para interagir com os modelos mais avançados de inteligência artificial. Rápida, intuitiva e integrada ao seu fluxo de trabalho.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg w-full sm:w-auto">
              Experimentar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
              Ver Demonstração
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Por que escolher a Aura?</h2>
            <p className="text-slate-500 dark:text-slate-400">Desenvolvida com as tecnologias mais recentes do mercado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Zap}
              title="Resposta Instantânea"
              description="Processamento em tempo real com tempos de carregamento otimizados."
            />
            <FeatureCard
              icon={Shield}
              title="Privacidade"
              description="Seus dados de sessão são protegidos e nunca compartilhados."
            />
            <FeatureCard
              icon={Globe}
              title="Acesso Global"
              description="Disponível em qualquer lugar, em qualquer dispositivo."
            />
            <FeatureCard
              icon={Sparkles}
              title="Interface Moderna"
              description="Design limpo com modo claro e escuro para melhor conforto visual."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
    >
      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
}
