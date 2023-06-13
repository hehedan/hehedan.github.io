<template>
  <div class="Left box_shadow">
    <div class="Left_up">
      <img src="../../assets/avatar.jpg" alt="avatar" class="Left_img" />
    </div>
    <div class="Left_down">
      <h2>Jayce</h2>
      <text>3年 | 前端开发工程师</text>
      <div class="Left_down_icons">
        <el-popover
          placement="bottom"
          :width="200"
          trigger="hover"
          content="上海"
        >
          <template #reference>
            <LocalTwo theme="filled" size="24" fill="#333" />
          </template>
        </el-popover>

        <el-popover placement="bottom" :width="200" trigger="hover">
          <template #reference>
            <Github theme="filled" size="24" fill="#333" />
          </template>
          <a href="https://github.com/hehedan">https://github.com/hehedan</a>
        </el-popover>

        <el-popover
          placement="bottom"
          :width="200"
          trigger="hover"
          content="shaoxman"
        >
          <template #reference>
            <Wechat theme="filled" size="24" fill="#333" />
          </template>
        </el-popover>

        <el-popover
          placement="bottom"
          :width="200"
          trigger="hover"
          content="2267752225@qq.com"
        >
          <template #reference>
            <Mail theme="filled" size="24" fill="#333" />
          </template>
        </el-popover>
      </div>
      <div class="Left_down_btn" @click="download">下载源码</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LocalTwo, Github, Mail, Wechat } from "@icon-park/vue-next";

/* ---变量--- */
// const emit = defineEmits(["exportPng"]);
/* ---方法--- */
const download = () => {
  // emit("exportPng");
  window.location.href = "https://github.com/hehedan/hehedan.github.io";
};
</script>

<style scoped lang="less">
.Left {
  padding: 20px;
  min-width: 260px;
  max-height: 400px;
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
      box-sizing: border-box;
      margin-top: 20px;
      font-size: 20px;
      padding: 10px 40px;
      border-radius: 30px;
      background-color: oldlace;
      text-align: center;
      cursor: pointer;
      user-select: none;
      color: #333;
    }
    &_btn:hover {
      background-color: bisque;
    }
    &_icons {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 160px;
      margin-top: 20px;
    }
    text {
      color: #a2a2a2;
    }
  }
}
</style>
