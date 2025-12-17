<template>
  <section class="btn">
    <n-select
      v-model:value="select"
      style="width: 111px"
      size="small"
      :options="selectOpts"
      @update:value="selectChange"
    />
    <n-button-group size="small">
      <n-button round @click="onThemeChange">
        <template #icon>
          <n-icon>
            <MoonOutline v-if="!isDark" />
            <Sunny v-else />
          </n-icon>
        </template>
      </n-button>
      <n-button ghost @click="onLangChange">
        <template #icon>
          <n-icon>{{ isZh ? "en" : "中" }}</n-icon>
        </template>
      </n-button>

      <n-button ghost @click="toMyHub">
        <template #icon>
          <n-icon><Home /></n-icon>
        </template>
      </n-button>
      <n-button @click="handleDrawer">
        <template #icon>
          <n-icon><Pencil /> </n-icon>
        </template>
      </n-button>
      <n-button v-if="isEditFlag" type="primary" @click="save">
        <template #icon>
          <n-icon><Save /></n-icon>
        </template>
      </n-button>
      <n-button round @click="downloadPdf">
        <template #icon>
          <n-icon>
            <CloudDownloadOutline />
          </n-icon>
        </template>
      </n-button>
    </n-button-group>
  </section>
  <n-drawer v-model:show="active" placement="top">
    <n-drawer-content title="请输入token">
      <div class="drawer-content">
        <n-input
          v-model:value.trim="token"
          clearable
          :status="token ? '' : 'error'"
          style="width: 200px; margin-right: 16px"
        />
        <n-button circle @click="edit" type="primary" secondary>
          <template #icon>
            <n-icon><Checkmark /></n-icon>
          </template>
        </n-button>
        <n-button
          circle
          style="margin-left: 8px"
          @click="close"
          type="error"
          secondary
        >
          <template #icon>
            <n-icon><CloseOutline /></n-icon>
          </template>
        </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { selectOpts } from "../utils/const";
import { ref, onMounted } from "vue";
import {
  Sunny,
  CloudDownloadOutline,
  MoonOutline,
  Pencil,
  Home,
  Save,
  Checkmark,
  CloseOutline,
} from "@vicons/ionicons5";
import { initOctokit } from "../utils/githubApi";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});
const active = ref(false);
const isEditFlag = ref(false);
const token = ref("");

onMounted(() => {
  isEditFlag.value = props.isEdit;
  if (props.isEdit) {
    active.value = true;
  }
});
const emits = defineEmits([
  "themeChange",
  "langChange",
  "selectChange",
  "save",
  "edit",
]);
const downloadPdf = () => {
  // 创建一个 a 标签
  var a = document.createElement("a");
  // 设置 a 标签的 href 属性为 URL 对象
  a.href = `${import.meta.env.BASE_URL}${locale.value}.pdf`;
  // 设置 a 标签的 download 属性为文件名
  a.download = (locale.value === "zh" ? "我的简历" : "My Resume") + ".pdf";
  // 模拟点击 a 标签
  a.click();
  a.remove();
  a = null;
};
const select = ref("basic");
const edit = () => {
  if (!token.value) return;
  active.value = false;
  initOctokit(token.value);
  isEditFlag.value = true;
  emits("edit", true);
};
const save = () => {
  emits("save");
};
const setIsEdit = (v) => {
  isEditFlag.value = v;
};
const close = () => {
  active.value = false;
  isEditFlag.value = false;
  emits("edit", false);
};
const handleDrawer = () => {
  if (isEditFlag.value) {
    isEditFlag.value = false;
    emits("edit", false);
    return;
  }
  if (token.value) {
    edit();
  } else {
    active.value = true;
  }
};
const isDark = ref(false);
const isZh = ref(true);
const onThemeChange = () => {
  isDark.value = !isDark.value;
  emits("themeChange", isDark.value);
};
const onLangChange = () => {
  isZh.value = !isZh.value;
  select.value = "basic";
  emits("langChange", isZh.value);
};
const selectChange = (v) => {
  emits("selectChange", v);
};
const toMyHub = () => {
  window.open("https://juejin.cn/user/2243472951876791");
};
const setIsZh = (v) => {
  isZh.value = v;
};
defineExpose({
  setIsZh,
  setIsEdit,
});
</script>
<style lang="less" scoped>
.btn {
  @flex-row();
  background: var(--bg);
  padding: 16px;
}
.drawer-content {
  @flex-juzhong();
}
</style>
