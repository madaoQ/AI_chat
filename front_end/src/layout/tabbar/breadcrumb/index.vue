<template>
    <el-icon style="margin-right: 10px;" @click="changIcon">
        <component :is="layoutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<script setup lang="ts">
import useLayoutStore from '@/store/modules/setting.ts';
//控制菜单的折叠
let layoutSettingStore = useLayoutStore();
layoutSettingStore.fold;
//点击图标的方法
const changIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold;
}
</script>

<style scoped></style>