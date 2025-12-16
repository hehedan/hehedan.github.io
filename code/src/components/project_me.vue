<template>
  <section id="project_me" class="project_me">
    <n-divider title-placement="left">
      <div class="title">
        {{ t("project_me.title") }}
        <n-icon v-if="isEdit" class="icon-btn" @click="add"
          ><AddCircle
        /></n-icon>
      </div>
    </n-divider>
    <div v-for="(i, index) in list" :key="index" class="item">
      <div v-if="!isEdit">
        <div class="project_me-name">
          {{ i.name }}

          <n-icon class="icon-btn" @click="openLink(i.link)"
            ><LinkOutline
          /></n-icon>
        </div>
        <div>
          <div class="project_me-item">
            <label>▪ {{ t("const.il") }}：</label>
            <div>{{ i.ic }}</div>
          </div>
          <div class="project_me-item">
            <label>▪ {{ t("const.cl") }}：</label>
            <div>{{ i.cc }}</div>
          </div>
          <div class="project_me-item">
            <label>▪ {{ t("const.dl") }}：</label>
            <div>{{ i.dc }}</div>
          </div>
        </div>
      </div>
      <template v-else>
        <n-input
          ref="project_meInputRef"
          style="width: 80%"
          size="small"
          v-model:value="list[index].name"
          :status="i.name ? '' : 'error'"
          :placeholder="
            t('const.input') + (locale === 'en' ? ' ' : '') + t('const.pnl')
          "
          @update:value="() => dataChange()"
          clearable
        />
        <n-icon class="icon-btn" @click="remove(index)"
          ><RemoveCircle
        /></n-icon>
        <n-input
          ref="project_meInputRef"
          style="width: 80%"
          size="small"
          v-model:value="list[index].ic"
          :status="i.ic ? '' : 'error'"
          :placeholder="
            t('const.input') + (locale === 'en' ? ' ' : '') + t('const.il')
          "
          @update:value="() => dataChange()"
          clearable
        />
        <n-input
          ref="project_meInputRef"
          style="width: 80%"
          size="small"
          v-model:value="list[index].cc"
          :status="i.cc ? '' : 'error'"
          :placeholder="
            t('const.input') + (locale === 'en' ? ' ' : '') + t('const.cl')
          "
          @update:value="() => dataChange()"
          clearable
        />
        <n-input
          ref="project_meInputRef"
          style="width: 80%"
          size="small"
          v-model:value="list[index].dc"
          :status="i.dc ? '' : 'error'"
          :placeholder="
            t('const.input') + (locale === 'en' ? ' ' : '') + t('const.dl')
          "
          @update:value="() => dataChange()"
          clearable
        />
        <n-input
          ref="project_meInputRef"
          style="width: 80%"
          size="small"
          v-model:value="list[index].link"
          :status="i.link ? '' : 'error'"
          :placeholder="
            t('const.input') + (locale === 'en' ? ' ' : '') + t('const.linkl')
          "
          @update:value="() => dataChange()"
          clearable
        />
      </template>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch, onMounted } from "vue";
import { AddCircle, RemoveCircle, LinkOutline } from "@vicons/ionicons5";
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  res: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(["change"]);
const { t, locale } = useI18n();
const list = ref();
const project_meInputRef = ref(null);
const initData = () => {
  if (!props.isEdit) {
    const str = t("project_me.list");
    if (str) {
      list.value = JSON.parse(str);
    }
  } else {
    const listStr = props.res[locale.value].project_me.list;
    if (listStr) {
      list.value = JSON.parse(listStr);
    }
  }
};
const openLink = (url) => {
  window.open(url, "_blank");
};
const add = () => {
  list.value.push({
    name: "",
    ic: "",
    cc: "",
    dc: "",
  });
  dataChange(true, true, {
    name: "",
    ic: "",
    cc: "",
    dc: "",
  });
};
const remove = (index) => {
  list.value.splice(index, 1);
  dataChange(true, false, index);
};
const dataChange = (needAll = false, isAdd = false, emptyItem = "") => {
  emits(
    "change",
    list.value,
    locale.value,
    "project_me",
    true,
    needAll,
    isAdd,
    emptyItem
  );
};
const validateData = () => {
  const res = project_meInputRef.value.some((i) => i.status === "error");
  return !res;
};
// 监听语言变化
watch(locale, () => initData());
onMounted(() => initData());
defineExpose({
  validateData,
});
</script>
<style lang="less" scoped>
.project_me {
  text-align: left;
  padding: 0 16px;
  .project_me-name {
    font-weight: bold;
    margin-bottom: 8px;
    @flex-juzhong();
  }
  .project_me-content {
    text-indent: 2em;
  }
  .project_me-item {
    display: flex;
    flex-direction: row;
    label {
      font-weight: bold;
    }
  }
}
</style>
l
