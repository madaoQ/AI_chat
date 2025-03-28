//自定义插件

// 为了消除找不到模块声明文件的错误，需要添加类型声明

import SvgIcon from "@/components/SvgIcon.vue"

const allGlobalComponent: any = { SvgIcon }

export default {
    install(app: any) {
        //注册为全局组件  第一个参数是组件名字 第二个参数是组件内容
        Object.keys(allGlobalComponent).forEach(item => {
            app.component(item, allGlobalComponent[item])
        })
    }
}