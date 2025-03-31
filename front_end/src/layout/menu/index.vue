<template>

  <!-- 动态生成的菜单 -->
  <template v-for="(item,index) in menuList" :key="item.path">
    
    <!-- 一级菜单 -->
     <!-- 无子路由 -->
     <el-menu-item v-if="!item.children && item.meta" :index="index">
        <template #title>
          <span>标&nbsp;</span>
            <span>{{ item.meta.title }}</span>
          </template>
     </el-menu-item>

     <!-- 有子路由但只有一个 -->
     <el-menu-item v-if="item.children && item.children.length === 1" :index="index">
        <template #title>
          <span>标&nbsp;</span>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
     </el-menu-item>

     <!-- 有子路由且有多个 -->
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="index">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归实现二级菜单 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>

    
  </template>

</template>

<script setup lang="ts">
//获取父组件传递过来的菜单列表
defineProps(['menuList'])
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped>
  
</style>