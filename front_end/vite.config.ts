import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
//SVG插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons-ng';

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      /**
      //    * custom insert position
      //    * @default: body-last
      //    */
      inject: 'body-last',

      // /**
      //  * custom dom id
      //  * @default: __svg__icons__dom__
      //  */
      customDomId: '__svg__icons__dom__',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    }
  },
  // 全局css
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: {
  //         hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
  //       },
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
  css: {
    preprocessorOptions: {
      less: {
      //你的less文件 地址
        // additionalData: `
        //   @import "@/assets/styles/variables.less";
        //   @import "@/assets/styles/mixins.less";
        // `,
        javascriptEnabled: true,
      },
    }
  }
})
