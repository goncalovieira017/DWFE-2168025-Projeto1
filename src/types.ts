/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AIResponse {
  id: string;
  prompt: string;
  response: string;
  timestamp: number;
  loadingTime: number;
  model: string;
}

export interface AIStats {
  totalRequests: number;
  averageResponseTime: number;
  totalTokens: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
