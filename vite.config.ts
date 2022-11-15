import _path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // port: 8080,
    proxy: {
      '/dev_api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dev_api/, "")
      },
      '/pro_api': {
        target: 'https://imusic-17670-5-1314961027.sh.run.tcloudbase.com/',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/pro_api/, "")
      }
    }
  },
  envDir: './env',
  envPrefix: ['VITE_'],
  plugins:
    [vue({
      template: transformAssetUrls
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    ],
  // 配置项目别名
  resolve: {
    //设置路径别名
    alias: {
      '@': _path.resolve(__dirname, './src'),
      '*': _path.resolve('')
    },
  },
})
