//对外暴露配置路由

// 静态路由
export const constantRoute = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/login/index.vue'), name: 'login' },
    { path: '/layout', component: () => import('@/layout/index.vue'), name: 'layout' },
    { path: '/404', component: () => import('@/views/404/index.vue'), name: '404' },
    { path: '/:pathMatch(.*)*', redirect: '/404',name: 'any' },
]