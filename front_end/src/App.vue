<template>
    <div>
        <h1 class="head">根组件</h1>
        <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
        <SvgIcon name="dog" width="100px"></SvgIcon>
    </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
console.log(import.meta.env);
</script>
<style scoped lang="less">
div {
    @heading-color: #f3c258;
    .head{
        color: @heading-color;
    }
}
</style>