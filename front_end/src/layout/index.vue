<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">layout_slider</div>
    <!-- 顶部导航 -->
     <div class="layout_tabbar">layout_tabbar</div>
     <!-- 内容展示区 -->
      <div class="layout_main">
        layout_main
        <p style="height: 10000px; background-color: aqua;">hello</p>      
      </div>
  </div>
</template>

<script setup lang="ts">
  
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
      float: left;
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

    .layout_main{
      position: absolute;
      width: calc(100% - @menu-width);
      height: calc(100vh - @top-height);
      left: @menu-width;
      top: @top-height;
      background-color: red;
      padding: 25px;
      overflow: auto;
    }
  }
</style>