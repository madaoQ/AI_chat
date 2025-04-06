<template>
  <div>
    <h1>AI Draw</h1>
    <el-icon>
    <component is=House></component>
    </el-icon>
    <el-input placeholder="请输入内容">
      <template #append>
        <el-icon>
          <component is=Search></component>
        </el-icon>
        </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>