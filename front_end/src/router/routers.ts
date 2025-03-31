//对外暴露配置路由

// 静态路由
export const constantRoute = [
    { path: '/', redirect: '/login', meta: { title: '重定向登录', hidden: true,icon: "Position" } },
    { path: '/login', component: () => import('@/views/login/index.vue'), name: 'login', meta: { title: '登录', hidden: true, icon: "Position" } },
    {
        path: '/layout', component: () => import('@/layout/index.vue'), name: 'layout',
        // 二级路由
        children: [
            { path: '/home', component: () => import('@/views/home/index.vue'), name: 'home', meta: { title: '首页', hidden: false,icon: "Position" } }
        ],
        meta: { title: '主页', hidden: false, icon: "Position"}
    },
    {
        path: '/chat', component: () => import('@/views/home/index.vue'), name: 'chat',
        children: [
            { path: '/chata', component: () => import('@/views/home/index.vue'), name: 'chata', meta: { title: '测试1', hidden: false, icon: "SwitchFilled" } },
            { path: '/chatb', component: () => import('@/views/home/index.vue'), name: 'chatb', meta: { title: '测试2', hidden: false, icon: "SwitchFilled" } }
        ],
        meta: { title: '聊天', hidden: false, icon: "Filter" }
    },
    { path: '/404', component: () => import('@/views/404/index.vue'), name: '404', meta: { title: '404', hidden: true,icon: "Position" } },
    { path: '/:pathMatch(.*)*', redirect: '/404', name: 'any', meta: { title: '兜底', hidden: true,icon: "Position" } },
]