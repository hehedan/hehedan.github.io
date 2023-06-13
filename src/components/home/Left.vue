<template>
  <div class="Left box_shadow">
    <div class="Left_up">
      <img src="../../assets/avatar.jpg" alt="avatar" class="Left_img" />
    </div>
    <div class="Left_down">
      <h2>Jayce</h2>
      <text>上海 | 前端开发工程师</text>
      <div class="Left_down_btn">save as pdf</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* ---变量--- */

/* ---方法--- */
</script>

<style scoped lang="less">
.Left {
  padding: 20px;
  min-width: 260px;
  height: 400px;
  margin-right: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 666px) {
    margin-right: 0px;
    margin-bottom: 20px;
    flex-direction: row;
  }
  .Left_up {
    display: flex;
    align-items: center;
    justify-content: center;
    .Left_img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }

  .Left_down {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    &_btn {
      margin-top: 20px;
      font-size: 20px;
      padding: 10px 20px;
      border-radius: 30px;
      background-color: oldlace;

      text-align: center;
      cursor: pointer;
      user-select: none;
    }
    &_btn:hover {
      background-color: bisque;
    }

    text {
      color: #a2a2a2;
    }
  }
}
</style>
