import type { RouteRecordRaw } from "vue-router";
//定义小仓库数据类型
export interface UserState {
    token: string | null; //用户唯一标识token
    menuRoutes: RouteRecordRaw[]; //仓库存储生成菜单需要数组(路由)
}