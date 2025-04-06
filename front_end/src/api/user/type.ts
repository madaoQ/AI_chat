//登录接口 Form
export interface LoginForm {
    username: string,
    password: string,

}

interface Data {
    token: string,
}
//登录接口 Response
export interface LoginResponse {
    code: number,
    data: Data,
}
//注册接口 Response
export interface RegisterResponse {
    code: number,
    data: string,
}