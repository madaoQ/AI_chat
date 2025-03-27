//进行axios二次封装 请求与响应拦截器
import axios from "axios"
import { ElMessage } from "element-plus";

//创建aixos实例 进行配置
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000, //请求超时时间 
});

//请求拦截器
request.interceptors.request.use((config) => {
    //config配置对象  headers属性请求头 经常给服务器携带公共参数
    return config;
});

//响应拦截器
request.interceptors.response.use(
    (res) => {
        //成功回调   简化数据
        return res.data;
    },
    (err) => {
        //失败回调  处理http网络错误
        let message = '';
        let status = err.response.status;
        switch (status) {
            case 401:
                message = 'TOKEN过期';
                break;
            case 403:
                message = '无权访问';
                break;
            case 404:
                message = '请求地址错误';
                break;
            case 500:
                message = '服务器出现问题';
                break;
            default:
                message = '网络出现问题';
                break;
        }
        //提示错误信息
        ElMessage({
            type: 'error',
            message,
        });
        //失败回调  处理http网络错误
        return Promise.reject(err);
    })

//对外暴露
export default request;