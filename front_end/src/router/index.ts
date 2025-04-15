//通过vue-router实现路由配置
import { createRouter, createWebHistory } from "vue-router";
import { constantRoute } from "./routers";
//创建路由器
const router = createRouter({
    //使用history模式
    history: createWebHistory(),
    //路由配置 懒加载
    routes: constantRoute,
    //滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    }
})

export default router;