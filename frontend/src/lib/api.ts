import axios from 'axios'

const api = axios.create({
  // In Vercel deployment the serverless backend is available at `/api`
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export type ChatRequest = {
  message: string
}

export type ChatResponse = {
  reply: string
}

export async function sendChat(message: string) {
  const response = await api.post<ChatResponse>('/chat', { message } satisfies ChatRequest)
  return response.data.reply
}
