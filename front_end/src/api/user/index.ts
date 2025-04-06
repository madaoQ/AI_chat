//用户相关接口  
import request from "@/utils/request.ts";
import type { LoginForm, LoginResponse,RegisterResponse } from "@/api/user/type.ts";
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info',
    LOGOUT_URL = '/user/logout'

}

//暴露请求函数
//登录接口方法
export const reqLogin = (data: LoginForm): Promise<LoginResponse> => request.post(API.LOGIN_URL, data)

//注册接口方法
export const reqRegister = (data: LoginForm): Promise<RegisterResponse> => request.post(API.USERINFO_URL,data)