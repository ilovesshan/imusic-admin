import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    // port: 8080,
    proxy: {
      '/api': {
        target: 'https://imusic-17670-5-1314961027.sh.run.tcloudbase.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,"")
      }
    }
  },
  plugins:
    [vue({
      template: transformAssetUrls
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    ]
})
