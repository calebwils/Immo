import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/qwen': {
            target: 'https://ws-hrpprn3nx2citb4c.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/chat/completions',
            changeOrigin: true,
            rewrite: () => '',
            headers: {
              'Authorization': `Bearer ${env.VITE_QWEN_API_KEY || 'sk-ws-H.DMYHEHM.uWeV.MEYCIQDIX8DbXSabp_OXZ90ELFKP5h22WbSMNf1yoHtWyk3C1QIhAOhK30EJNVo4DH0kIAbH9cBEDP0Y4iFIWLBaxFJS9e8g'}`
            }
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.QWEN_API_KEY': JSON.stringify(env.VITE_QWEN_API_KEY || 'sk-ws-H.DMYHEHM.uWeV.MEYCIQDIX8DbXSabp_OXZ90ELFKP5h22WbSMNf1yoHtWyk3C1QIhAOhK30EJNVo4DH0kIAbH9cBEDP0Y4iFIWLBaxFJS9e8g'),
        'process.env.QWEN_API_URL': JSON.stringify(env.VITE_QWEN_API_URL || 'https://ws-hrpprn3nx2citb4c.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
