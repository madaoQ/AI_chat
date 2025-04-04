<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import useLayoutStore from '@/store/modules/setting';
const layoutStore = useLayoutStore();
//监听是否点击刷新按钮
watch(
  () => layoutStore.refresh,
  () => {
    //刷新页面
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    })
  }
);
//控制组件是否销毁重建
let flag = ref(true);
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.5s ease;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);

}
</style>