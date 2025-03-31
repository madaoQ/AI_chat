<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu background-color=@menu-bg-color text-color="white">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">layout_tabbar</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入左侧菜单组件
import Logo from '@/layout/logo/index.vue'
//引入菜单组件
import Menu from '@/layout/menu/index.vue'

import Main from '@/layout/main/index.vue'
//获取user小仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
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

    .scrollbar {
      height: calc(100vh - @menu-logo-height);
      padding: 25px;

      .el-menu {
        border-right: none;
      }
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
  }
}
</style>