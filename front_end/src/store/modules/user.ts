//创建用户相关的小仓库
import { defineStore } from "pinia";

//引入表单数据类型
import type { LoginForm, LoginResponse } from "@/api/user/type.ts";

//引入接口
import { reqLogin } from "@/api/user";

//创建用户相关的小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据地方
    state: () => {
        return {
            //用户信息对象
            token: localStorage.getItem('TOKEN'), //用户唯一标识token
            menuRoutes: [], //仓库存储生成菜单需要数组[路由] 
        }
    },

    //异步|逻辑的地方
    actions: {
        //用户登录
        async userLogin(data: LoginForm) {
            let result:LoginResponse = await reqLogin(data);
            //登录请求 成功 200 -> token
            if (result.code == 200) {
                this.token = result.data.token as string; 
                localStorage.setItem('TOKEN', this.token);
                //返回成功Promise
                return 'ok';
            }else{
                //登录请求 失败 201 -> 用户名或密码错误
                return Promise.reject(new Error(result.data.token));
            }
            
        }
    },

    //理解为计算属性，用于简化仓库数据，方便组件获取
    getters: {},

})

//对外暴露获取小仓库的方法
export default useUserStore;