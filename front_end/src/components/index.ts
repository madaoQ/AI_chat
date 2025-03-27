//自定义插件

// 为了消除找不到模块声明文件的错误，需要添加类型声明
// 如果你使用了vue-tsc，它会自动处理vue文件的类型声明
// 若没有，可手动添加类型声明文件或使用三斜线指令
// 这里假设你使用了vue-tsc，以下是修改后的导入语句
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