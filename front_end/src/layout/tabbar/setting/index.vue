<template>
    <el-button type="primary" size="small" icon="Refresh" :circle="true" @click="updateRefresh"></el-button>
    <el-button type="primary" size="small" icon="FullScreen" :circle="true"></el-button>
    <el-button type="primary" size="small" icon="Setting" :circle="true"></el-button>

    <img src="@/assets/icons/AI.svg" style="width: 30px; height: 30px; margin:0px 10px ;" alt="userHead">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            Dropdown List
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<script setup lang="ts">
import useLayoutStore from '@/store/modules/setting';
const layoutStore = useLayoutStore();

const updateRefresh = () => {
    layoutStore.refresh = !layoutStore.refresh;
}
</script>

<style scoped></style>