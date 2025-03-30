//封装本地管理数据的方法
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN') ?? '' 
}