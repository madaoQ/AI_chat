<template>

  <!-- 动态生成的菜单 -->
  <template v-for="(item) in menuList" :key="item.path" >
    
    <!-- 一级菜单 -->
     <!-- 无子路由 -->
     <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute(item)">
       <el-icon>
         <component :is="item.meta.icon"></component>
       </el-icon>
        <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
     </el-menu-item>

     <!-- 有子路由但只有一个 -->
     <el-menu-item v-if="item.children && item.children.length === 1 && !item.children[0].meta.hidden" :index="item.path" @click="goRoute(item.children[0])">
       <el-icon>
         <component :is="item.children[0].meta.icon"></component>
       </el-icon>
        <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
     </el-menu-item>

     <!-- 有子路由且有多个 -->
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path" text-color="white" background-color=@menu-bg-color>
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归实现二级菜单 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>

    
  </template>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
//获取父组件传递过来的菜单列表
defineProps(['menuList'])
//引入路由器
const router = useRouter()
//点击菜单的回调
const goRoute =(item:any)=>{
  router.push(item.path)
}
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped>
  
</style>