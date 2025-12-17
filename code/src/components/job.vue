<template>
  <section id="job" class="job">
    <n-divider title-placement="left">
      <div class="title">
        {{ t("job.title") }}
        <n-icon v-if="isEdit" class="icon-btn" @click="add"
          ><AddCircle
        /></n-icon>
      </div>
    </n-divider>
    <div v-for="(i, index) in list" :key="index" class="item">
      <div v-if="!isEdit">
        <div class="job-company">{{ i.company }}</div>
        <div class="job-name">▪ {{ i.name }}</div>
        <div class="job-content">{{ i.content }}</div>
      </div>
      <template v-else>
        <div class="edit-form-content">
          <div style="width: 80%">
            <n-input
              ref="jobInputRef"
              size="small"
              v-model:value.trim="list[index].company"
              :status="i.company ? '' : 'error'"
              :placeholder="
                t('const.input') + (locale === 'en' ? ' ' : '') + t('const.cnl')
              "
              @update:value="() => dataChange()"
              clearable
            />
            <n-input
              ref="jobInputRef"
              size="small"
              v-model:value.trim="list[index].name"
              :status="i.name ? '' : 'error'"
              :placeholder="
                t('const.input') +
                (locale === 'en' ? ' ' : '') +
                t('const.jobl')
              "
              @update:value="() => dataChange()"
              clearable
            />
            <n-input
              ref="jobInputRef"
              size="small"
              v-model:value.trim="list[index].content"
              :status="i.content ? '' : 'error'"
              :placeholder="
                t('const.input') + (locale === 'en' ? ' ' : '') + t('const.ccl')
              "
              @update:value="() => dataChange()"
              clearable
            />
          </div>
          <div class="edit-form-btn">
            <n-icon class="icon-btn" @click="remove(index)"
              ><RemoveCircle
            /></n-icon>
            <n-icon v-show="index !== 0" class="icon-btn" @click="up(index)"
              ><CaretUpCircle
            /></n-icon>
            <n-icon
              v-show="index !== list.length - 1"
              class="icon-btn"
              @click="down(index)"
              ><CaretDownCircle
            /></n-icon>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch, onMounted } from "vue";
import {
  AddCircle,
  RemoveCircle,
  CaretUpCircle,
  CaretDownCircle,
} from "@vicons/ionicons5";
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
const jobInputRef = ref(null);
const initData = () => {
  if (!props.isEdit) {
    const str = t("job.list");
    if (str) {
      list.value = JSON.parse(str);
    }
  } else {
    const listStr = props.res[locale.value].job.list;
    if (listStr) {
      list.value = JSON.parse(listStr);
    }
  }
};
const add = () => {
  list.value.push({
    company: "",
    name: "",
    content: "",
  });
  dataChange(true, true, {
    company: "",
    name: "",
    content: "",
  });
};
const remove = (index) => {
  list.value.splice(index, 1);
  dataChange(true, false, index);
};
const up = (index) => {
  const temp = list.value[index];
  list.value[index] = list.value[index - 1];
  list.value[index - 1] = temp;
  dataChange(false, false, "", true, index, true);
};
const down = (index) => {
  const temp = list.value[index];
  list.value[index] = list.value[index + 1];
  list.value[index + 1] = temp;
  dataChange(false, false, "", true, index, false);
};
const dataChange = (
  needAll = false,
  isAdd = false,
  emptyItem = "",
  needOrder = false,
  index = -1,
  isUp = false
) => {
  emits(
    "change",
    list.value,
    locale.value,
    "job",
    true,
    needAll,
    isAdd,
    emptyItem,
    needOrder,
    index,
    isUp
  );
};
const validateData = () => {
  const res = jobInputRef.value.some((i) => i.status === "error");
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
.job {
  text-align: left;
  padding: 0 16px;
  .job-company {
    font-weight: bold;
  }
  .job-content {
    text-indent: 2em;
  }
}
</style>
l
