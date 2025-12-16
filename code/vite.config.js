import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      // 全局导入变量
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/assets/css/index.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 1666, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
  },
});
