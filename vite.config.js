import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const cherryPickedKeys = [
  "REACT_APP_API_URL",
  "REACT_APP_DEFAULT_LANGUAGE",
  "REACT_APP_CLIENTID",
  "REACT_APP_CLIENTSECRET",
  "REACT_APP_GOOGLE_CLIENT_ID"
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@apis': path.resolve(__dirname, 'src/apis')
      }
    }
  }
})