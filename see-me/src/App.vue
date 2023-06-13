<script setup>
import Left from "./components/home/Left.vue";
import Right from "./components/home/Right.vue";
// import { ref } from "vue";
// const rightRef = ref(null);
// const exportPng = () => {
//   const dd = rightRef.value.children[1];
//   console.log(dd, dd.scrollLeft, dd.scrollTop, dd.scrollWidth, dd.scrollHeight);
// };
</script>

<template>
  <div class="container">
    <div class="container_body" ref="rightRef">
      <Left />
      <Right />
    </div>
    <img src="./assets/bg.svg" class="bg" alt="bg" />
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bg {
    position: absolute;
    bottom: 0;
  }
  .container_body {
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media screen and (max-width: 666px) {
      flex-direction: column;
    }
  }
}
</style>
