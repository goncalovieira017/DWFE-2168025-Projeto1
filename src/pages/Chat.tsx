import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User as UserIcon, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const { addHistory, user } = useApp();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    const currentPrompt = prompt;
    setPrompt('');
    setLoading(true);
    setError(null);
    setMessages(prev => [...prev, { role: 'user', text: currentPrompt }]);

    const startTime = Date.now();

    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'undefined') {
        throw new Error('MISSING_API_KEY');
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Chamada seguindo as diretrizes do Skill Gemini API
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: currentPrompt }] }],
      });

      const responseText = response.text || 'Desculpe, não consegui gerar uma resposta.';
      const endTime = Date.now();
      const loadingTime = endTime - startTime;

      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      
      addHistory({
        id: Math.random().toString(36).substr(2, 9),
        prompt: currentPrompt,
        response: responseText,
        timestamp: Date.now(),
        loadingTime,
        model: 'gemini-3-flash-preview',
      });
    } catch (err: any) {
      console.error('Chat Error:', err);
      let errorMessage = 'Ocorreu um erro ao comunicar com a IA. Por favor, tente novamente.';
      
      if (err.message === 'MISSING_API_KEY') {
        errorMessage = 'Chave da Gemini API não encontrada. Por favor, configure a chave no painel "Settings > Secrets" do AI Studio.';
      }

      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'ai', text: 'Erro ao processar sua solicitação.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-4xl mx-auto w-full">
      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
      >
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50"
            >
              <Sparkles className="w-16 h-16 text-blue-500" />
              <div>
                <h3 className="text-xl font-bold">Como posso ajudar hoje?</h3>
                <p>Inicie uma conversa ou peça para eu criar algo para você.</p>
              </div>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-blue-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
              )}
              
              <div 
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-tl-none prose dark:prose-invert prose-p:my-0'
                }`}
              >
                {msg.role === 'ai' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 text-white">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 rounded-2xl rounded-tl-none italic text-slate-400">
                Aura está a pensar...
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/50"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <form onSubmit={handleSend} className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Pergunte qualquer coisa..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none min-h-[60px] max-h-[200px]"
            rows={1}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-blue-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[10px] text-center mt-2 text-slate-400 uppercase tracking-widest font-medium">
          Aura AI pode cometer erros. Verifique informações importantes.
        </p>
      </div>
    </div>
  );
}
