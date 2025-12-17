<template>
  <section id="summary" class="summary">
    <n-divider title-placement="left">
      <div class="title">
        {{ t("summary.title") }}
        <n-icon v-if="isEdit" class="icon-btn" @click="add"
          ><AddCircle
        /></n-icon>
      </div>
    </n-divider>
    <div v-for="(i, index) in list" :key="index">
      <div v-if="!isEdit">{{ i }}</div>
      <template v-else>
        <n-input
          ref="summaryInputRef"
          style="width: 80%"
          size="small"
          v-model:value.trim="list[index]"
          :status="i ? '' : 'error'"
          :placeholder="t('const.input')"
          @update:value="() => dataChange()"
          clearable
        />
        <n-icon class="icon-btn" @click="remove(index)"
          ><RemoveCircle
        /></n-icon>
      </template>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch, onMounted } from "vue";
import { AddCircle, RemoveCircle } from "@vicons/ionicons5";
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
const summaryInputRef = ref(null);
const initData = () => {
  if (!props.isEdit) {
    const str = t("summary.list");
    if (str) {
      list.value = JSON.parse(str);
    }
  } else {
    const listStr = props.res[locale.value].summary.list;
    if (listStr) {
      list.value = JSON.parse(listStr);
    }
  }
};
const add = () => {
  list.value.push("");
  dataChange(true, true, "");
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
    "summary",
    true,
    needAll,
    isAdd,
    emptyItem
  );
};
const validateData = () => {
  const res = summaryInputRef.value.some((i) => i.status === "error");
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
.summary {
  text-align: left;
  padding: 0 16px;
}
</style>
l
