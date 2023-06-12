<script setup></script>

<template>
  <div class="container"></div>
</template>

<style scoped>
.container {
  display: flex;
  /* 设置容器尺寸 - 原理1 */
  width: 100%;
  height: 100%;
  /* 背景渐变色 - 原理2 */
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  /* 背景尺寸 - 原理3 */
  background-size: 600% 600%;
  /* 循环动画 - 原理4 */
  animation: gradientBG 6s ease infinite;
}

/* 动画，控制背景 background-position */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
