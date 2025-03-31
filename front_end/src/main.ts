import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register' 

//引入路由
import router from './router/index.ts'

//引入仓库
import pinia from '@/store/index.ts'

const app = createApp(App)

//安装仓库
app.use(pinia)

// 获取 title 元素
const appTitle = document.getElementById('app-title');
if (appTitle) {
    // 设置 title 内容
    appTitle.textContent = import.meta.env.VITE_APP_TITLE;
}

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(router)

// 全局注册 svg-icon 组件 
//app.component('SvgIcon', SvgIcon)
// 但是全局组件一多，比较麻烦 所以自定义插件自动注册所有全局组件
import gloablComponent from './components/index.ts'
app.use(gloablComponent) //触发它的install方法

app.mount('#app')

