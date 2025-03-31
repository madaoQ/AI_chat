//对外暴露配置路由

// 静态路由
export const constantRoute = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/login/index.vue'), name: 'login', meta: { title: '登录' } },
    {
        path: '/layout', component: () => import('@/layout/index.vue'), name: 'layout',
        // 二级路由
        children: [
            { path: '/home', component: () => import('@/views/home/index.vue'), name: 'home', meta: { title: '首页' } }
        ],
        meta: { title: '主页' }
    },
    {
        path: '/chat', component: () => import('@/views/home/index.vue'), name: 'chat', meta: { title: '聊天' },
        children: [
            { path: '/chata', component: () => import('@/views/home/index.vue'), name: 'chata', meta: { title: '测试1' } },
            { path: '/chatb', component: () => import('@/views/home/index.vue'), name: 'chatb', meta: { title: '测试2' } }
        ]
    },
    { path: '/404', component: () => import('@/views/404/index.vue'), name: '404' },
    { path: '/:pathMatch(.*)*', redirect: '/404', name: 'any' },
]