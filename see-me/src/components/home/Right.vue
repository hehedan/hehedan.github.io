<template>
  <div class="Right box_shadow">
    <div class="Right_box">
      <h2>▪ 基本信息</h2>
      <div class="Right_box_body">
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">姓名：</div>
          <div class="Right_box_body_item_text">邵思杰</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">出生：</div>
          <div class="Right_box_body_item_text">96年</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">英语：</div>
          <div class="Right_box_body_item_text">CET-4</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">博客：</div>
          <div class="Right_box_body_item_text">
            <a href="https://juejin.cn/user/2243472951876791" target="_blank"
              >掘金</a
            >
          </div>
        </div>
      </div>
    </div>
    <el-divider />
    <div class="Right_box">
      <h2>▪ 项目经历</h2>
      <div class="Right_box_body">
        <h3>▫ 项目一 时间：2021.03 - 2022.06</h3>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">公司名称：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">项目背景：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">负责内容：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">项目难点：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">个人收获：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
      </div>
      <div class="Right_box_body">
        <h3>▫ 项目二 时间：2022.07 - 至今</h3>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">公司名称：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">项目背景：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">负责内容：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">项目难点：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">个人收获：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
      </div>
    </div>
    <el-divider />
    <div class="Right_box">
      <h2>▪ 个人项目</h2>
      <div class="Right_box_body">
        <h3>▫ 哆.生活H5</h3>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">项目初衷：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">项目难点：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">个人收获：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">👉 视频：</div>
          <div class="Right_box_body_item_text">
            <a
              href="https://www.bilibili.com/video/BV1rB4y1V761/"
              target="_blank"
              >去看视频</a
            >
          </div>
        </div>
      </div>

      <div class="Right_box_body">
        <h3>▫ 哆.生活App</h3>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">项目初衷：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">项目难点：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">个人收获：</div>
          <div class="Right_box_body_item_text">xxx</div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">👉 视频：</div>
          <div class="Right_box_body_item_text">
            <a
              href="https://www.bilibili.com/video/BV12X4y127Dc/"
              target="_blank"
              >去看视频</a
            >
          </div>
        </div>
      </div>
    </div>
    <el-divider />
    <div class="Right_box">
      <h2>▪ 职业技能</h2>
      <div class="Right_box_body">
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">Vue：</div>
          <div class="Right_box_body_item_text">
            <el-rate v-model="value1" allow-half />
          </div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">React：</div>
          <div class="Right_box_body_item_text">
            <el-rate v-model="value2" allow-half />
          </div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">ReactNative：</div>
          <div class="Right_box_body_item_text">
            <el-rate v-model="value3" allow-half />
          </div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">Python：</div>
          <div class="Right_box_body_item_text">
            <el-rate v-model="value4" allow-half />
          </div>
        </div>
      </div>
    </div>
    <el-divider />
    <div class="Right_box">
      <h2>▪ 工具技能</h2>
      <div class="Right_box_body">
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">Office三剑客：</div>
          <div class="Right_box_body_item_text">
            <el-rate
              v-model="value5"
              :texts="['不懂', '会一点', '略懂', '熟练', '精通']"
              show-text
            />
          </div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">思维导图：</div>
          <div class="Right_box_body_item_text">
            <el-rate
              v-model="value6"
              :texts="['不懂', '会一点', '略懂', '熟练', '精通']"
              show-text
            />
          </div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">node：</div>
          <div class="Right_box_body_item_text">
            <el-rate
              v-model="value7"
              :texts="['不懂', '会一点', '略懂', '熟练', '精通']"
              show-text
            />
          </div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">nginx：</div>
          <div class="Right_box_body_item_text">
            <el-rate
              v-model="value8"
              :texts="['不懂', '会一点', '略懂', '熟练', '精通']"
              show-text
            />
          </div>
        </div>
        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">docker：</div>
          <div class="Right_box_body_item_text">
            <el-rate
              v-model="value9"
              :texts="['不懂', '会一点', '略懂', '熟练', '精通']"
              show-text
            />
          </div>
        </div>

        <div class="Right_box_body_item">
          <div class="Right_box_body_item_label">redis：</div>
          <div class="Right_box_body_item_text">
            <el-rate
              v-model="value10"
              :texts="['不懂', '会一点', '略懂', '熟练', '精通']"
              show-text
            />
          </div>
        </div>
      </div>
    </div>
    <el-divider />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

/* ---变量--- */
const value1 = ref(4);
const value2 = ref(2);
const value3 = ref(2);
const value4 = ref(2);

const value5 = ref(4);
const value6 = ref(4);
const value7 = ref(3);
const value8 = ref(3);
const value9 = ref(2);
const value10 = ref(2);
/* ---方法--- */
</script>

<style scoped lang="less">
.Right {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  width: 666px;
  min-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  @media screen and (max-width: 666px) {
    width: 100%;
  }

  &_box {
    h2 {
      color: #a2a2a2;
    }
    &_body {
      margin-left: 20px;
      &_item {
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        &_label {
          display: flex;
          align-items: center;
          font-weight: bold;
        }
        &_text {
        }
      }
    }
  }
}
</style>
