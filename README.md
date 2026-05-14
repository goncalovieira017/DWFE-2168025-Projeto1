# Aura AI - Projeto I

## Relatório de Desenvolvimento Web Front-End

Este projeto foi desenvolvido como parte da Unidade Curricular de Desenvolvimento Web Front-End da ESTG (Universidade da Madeira). O objetivo principal é criar uma interface interativa (SPA) para um motor de Inteligência Artificial usando React.

### 1. Descrição da Solução
Aura AI é uma plataforma de chat inteligente que permite aos utilizadores interagir com modelos de linguagem de última geração (Google Gemini). A solução foca-se em fornecer uma experiência de utilizador (UX) moderna, rápida e funcional, com as seguintes características:

- **Landing Page Interativa:** Apresentação dinâmica da plataforma.
- **Sistema de Autenticação:** Login e Registo simulados para gestão de sessão.
- **Interface de Chat:** Prompt interativo com carregamento dinâmico de resultados.
- **Painel de Histórico:** Rastreamento de todas as interações passadas.
- **Dashboard de Métricas:** Estatísticas reais de utilização da API (número de pedidos, tempo de carregamento).
- **Personalização de Tema:** Suporte completo a Modo Claro e Escuro.

### 2. Arquitetura de Desenvolvimento
A aplicação segue o padrão SPA (Single Page Application) e foi estruturada de forma modular:

- **React Hook Context API:** Utilizada para gestão de estado global (tema, autenticação, histórico e estatísticas).
- **Componentização:** Uso de SFC (Single File Components) para garantir modularidade e escalabilidade.
- **Roteamento Dinâmico:** Implementado com `react-router-dom` para navegação fluida sem recarregamento de página.
- **Estilização:** Tailwind CSS para design responsivo e consistente.
- **Animações:** Framer Motion para transições de rotas e micro-interações.

### 3. Escolhas Técnicas e Justificação
- **Vite:** Escolhido como build tool pela sua rapidez no desenvolvimento e performance superior em relação ao Create React App.
- **Google Gemini API:** Integrada para garantir um processamento de linguagem natural robusto e atualizado.
- **Lucide React:** Biblioteca de ícones leve e consistente.
- **LocalStorage:** Utilizado para persistência de dados durante a sessão (tema e histórico), cumprindo os requisitos do enunciado.

### 4. Instruções de Utilização
1. **Registo:** Crie uma conta na página de Registo para aceder às funcionalidades privadas.
2. **Chat:** Navegue até "Chat IA" e envie uma pergunta ou comando.
3. **Dashboard:** Acompanhe as estatísticas de tempo de resposta e total de pedidos na página de Dashboard.
4. **Tema:** Utilize o botão de sol/lua no cabeçalho para alternar entre os temas claro e escuro.

---
**Curso:** TESP em Tecnologias e Programação de Sistemas de Informação
**Unidade Curricular:** Desenvolvimento Web Front-End
**Docentes:** Marco Olim, Eduardo Teles
**Ano Letivo:** 2025/2026
