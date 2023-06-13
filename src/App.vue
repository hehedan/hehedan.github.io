<script setup>
import Left from "./components/home/Left.vue";
import Right from "./components/home/Right.vue";
</script>

<template>
  <div class="container">
    <div class="container_body">
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
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media screen and (max-width: 666px) {
      flex-direction: column;
    }
  }
}
</style>
