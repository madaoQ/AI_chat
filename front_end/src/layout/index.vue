<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{fold:layoutSettingStore.fold?true:false}">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu :collapse="layoutSettingStore.fold?true:false"  :default-active="route.path" text-color="white" background-color=#283646 >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{fold:layoutSettingStore.fold?true:false}">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{fold:layoutSettingStore.fold?true:false}">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<script setup lang="ts">
//引入左侧菜单组件
import Logo from '@/layout/logo/index.vue'
//引入菜单组件
import Menu from '@/layout/menu/index.vue'
//引入主页面组件
import Main from '@/layout/main/index.vue'
//引入tabbar组件
import Tabbar from '@/layout/tabbar/index.vue'
//获取user小仓库
import useUserStore from '@/store/modules/user'
//获取layout小仓库
import useLayoutStore from '@/store/modules/setting'
//获取路由对象
import { useRoute } from 'vue-router'

//获取路由对象
const route = useRoute()
const userStore = useUserStore()
const layoutSettingStore = useLayoutStore()
</script>

<style lang="less" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;

  .layout_slider {
    width: @menu-width;
    height: 100vh;
    background-color: @menu-bg-color;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;

    .scrollbar {
      height: calc(100vh - @menu-logo-height);
      padding: 15px;

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: @menu-fold-width;
      }
    }
  

  .layout_tabbar {
    position: fixed;
    width: calc(100% - @menu-width);
    height: @top-height;
    background-color: @top-bg-color;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    top: 0%;
    left: @menu-width;
    z-index: 999;
    transition: all 0.2s ease-in-out;
    &.fold {
      width: calc(100% - @menu-fold-width);
      left: @menu-fold-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - @menu-width);
    height: calc(100vh - @top-height);
    left: @menu-width;
    top: @top-height;
    background-color: @content-bg-color;
    padding: 25px;
    overflow: auto;
    transition: all 0.2s ease-in-out;
    &.fold {
      width: calc(100% - @menu-fold-width);
      left: @menu-fold-width;
    }
  }
}
</style>