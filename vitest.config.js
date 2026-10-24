
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})


//Esta configuração ativa o suporte a JSX e disponibiliza um ambiente de navegador simulado para os testes.