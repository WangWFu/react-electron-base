import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import path from 'path'
import { rmSync } from 'fs'
// https://vitejs.dev/config/
export default defineConfig(() => {
  rmSync("dist-electron", { recursive: true, force: true });
  return {
    plugins: [
      react(),
      electron([
        {
          entry: 'electron/main/index.ts',
          vite: {
            build: {
              outDir: 'dist-electron/main'
            }
          }
        },
        {
          entry: 'electron/preload/index.ts',
          vite: {
            build: {
              outDir: 'dist-electron/preload'
            }
          }
        }
      ])
    ],
    resolve:{
      alias:{
        "@": path.join(__dirname, "src"),
      }
    },
  }
})
