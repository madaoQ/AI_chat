//对外暴露配置路由

// 静态路由
export const constantRoute = [
    { path: '/login', component: () => import('@/views/login/index.vue'), name: 'login' },
    { path: '/home', component: () => import('@/views/home/index.vue'), name: 'home' },
    { path: '/404', component: () => import('@/views/404/index.vue'), name: '404' },
    { path: '/:pathMatch(.*)*', redirect: '/404',name: 'any' },
]