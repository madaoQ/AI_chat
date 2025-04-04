<template>
  <div class="logo">
    <SvgIcon name="AI" width="35px" height="35px"></SvgIcon>
    <p :style="{ display: layoutSettingStore.fold ? 'none' : 'block' }">{{ setting.title }}</p>
  </div>
</template>


<script lang="ts">
export default {
  name: 'Logo',
}
</script>


<script setup lang="ts">
//引入标题
import setting from '@/setting.ts'
//获取layout小仓库
import useLayoutStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutStore()
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  color: aliceblue;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: @menu-logo-height;
  padding-top: 15px;

  p {
    margin-left: 5px;
    font-size: @menu-logo-font-size;
  }
}
</style>