<template>
    <el-icon style="margin-right: 10px;" @click="changIcon">
        <component :is="layoutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 动态展示路由 -->
        <el-breadcrumb-item v-for="(item,index) in route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon style="margin: 0px 3px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<script setup lang="ts">
import useLayoutStore from '@/store/modules/setting.ts';
import {useRoute} from 'vue-router';
//控制菜单的折叠
let layoutSettingStore = useLayoutStore();
//获取路由对象
let route = useRoute();
//点击图标的方法
const changIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold;
}
</script>

<style scoped></style>