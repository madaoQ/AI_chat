<template>
    <div class="tabbar">
        <div class="tabbar_left">
           <BreadCrumb></BreadCrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name: 'TabBar',
}
</script>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="less" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: linear-gradient(to right, #f5f5f5, #ffffff);

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}
</style>