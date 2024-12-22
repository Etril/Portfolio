import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Le dossier de production pour Heroku
    assetsDir: 'assets',  // Optionnel : organiser les ressources statiques
    manifest: true,  // Crée un fichier `manifest.json` utilisé par certaines plateformes de déploiement comme Heroku
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy des appels API vers le backend en développement
    },
  },
  // Pour des configurations spécifiques au déploiement (comme les variables d'environnement)
  define: {
    'process.env': process.env,  // S'assure que les variables d'environnement sont disponibles dans votre code
  },
})
