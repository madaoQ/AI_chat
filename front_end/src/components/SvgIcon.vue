<template>
    <!-- 修改为正确的对象语法来绑定样式 -->
    <svg aria-hidden="true" :style="{ width: width, height: height }">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </template>
  
  <script>
  import { defineComponent, computed } from 'vue'
  
  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: '#333',
      },
      width: {
        type: String,
        default: '16px',
      },
      hight: {
        type: String,
        default: '16px',
      },
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`)
      return { symbolId }
    },
  })
  </script>