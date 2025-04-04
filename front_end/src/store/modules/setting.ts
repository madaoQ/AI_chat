//关于layout组件配置的仓库
import { defineStore } from 'pinia'

let useLayoutStore = defineStore('SettingStore',{
    state: () => {
        return {
            //折叠菜单与否
            fold: false,
            refresh: false
        }
    },



})

export default useLayoutStore