<template>
  <div class="logo">
    <SvgIcon name="AI" width="35px" height="35px"></SvgIcon>
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
  //引入标题
  import setting from '@/setting.ts'
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    color: aliceblue;
    justify-content:center;
    align-items: center;
    width: 100%;
    height: @menu-logo-height;
    padding-top: 15px;
    p{
      margin-left: 10px;
      font-size: @menu-logo-font-size;
    }
  }
</style>