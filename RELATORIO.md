# Relatório de Projeto I - Aura AI

## 1. Identificação do Problema e Domínio
Este projeto aborda o domínio da interação entre humanos e Inteligência Artificial. Com a explosão de modelos de linguagem, existe uma necessidade crescente de interfaces que não só entreguem respostas, mas que permitam ao utilizador monitorizar o desempenho da IA e manter um histórico organizado de consultas, tudo num ambiente personalizado (temas claro/escuro).

## 2. Descrição da Solução
Aura AI é uma Single Page Application (SPA) que serve como hub de inteligência artificial. A solução inclui uma interface de chat robusta, um painel de controlo de métricas e persistência de sessão para histórico.

## 3. Arquitetura de Desenvolvimento
- **Framework:** React 19 com Vite para um ciclo de desenvolvimento ultra-rápido.
- **Gestão de Estado:** React Context API para manter a consistência de dados (Auth, Temas, Estatísticas) entre diferentes rotas.
- **Estilização:** Tailwind CSS v4, utilizando o sistema de camadas para componentes reutilizáveis e design responsivo.
- **Navegação:** React Router 6 para roteamento dinâmico no lado do cliente.
- **Integração IA:** SDK `@google/genai` para comunicação assíncrona com o modelo Gemini.

## 4. Justificação das Escolhas Técnicas
- **React:** Pela sua modularidade e vasta biblioteca de ecossistema.
- **Framer Motion:** Para garantir que a aplicação não pareça estática, adicionando uma camada de UX fluida (requisito do enunciado).
- **LocalStorage:** Escolhido para simular a persistência de dados "além da sessão" mas limitada ao encerramento do browser, conforme pedido.

## 5. Manual de Utilização
1. Abra a aplicação e explore a **Landing Page**.
2. Vá a **Começar** ou **Registrar** e preencha os dados (simulação).
3. Na página **Chat IA**, digite o seu prompt e aguarde o processamento dinâmico.
4. Consulte o **Histórico** para rever mensagens anteriores.
5. Visite o **Dashboard** para ver quanto tempo a IA demorou a responder e o total de interações.

---
**Desenvolvido por:** [Nome do Aluno]
**Número do Aluno:** [Nº]
**ESTG - UMa - 2025/2026**
