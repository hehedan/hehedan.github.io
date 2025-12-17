<template>
  <section id="edu" class="edu">
    <n-divider title-placement="left">
      <div class="title">{{ t("edu.title") }}</div>
    </n-divider>
    <div>
      <div v-if="!isEdit">{{ t("edu.school") }}</div>
      <n-input
        v-else
        size="small"
        style="width: 80%"
        v-model:value.trim="form.school"
        :status="form.school ? '' : 'error'"
        :placeholder="t('const.input')"
        @update:value="dataChange"
        clearable
      />
    </div>
    <div>
      <div v-if="!isEdit">{{ t("edu.major") }}</div>
      <n-input
        v-else
        size="small"
        style="width: 80%"
        v-model:value.trim="form.major"
        :status="form.major ? '' : 'error'"
        :placeholder="t('const.input')"
        @update:value="dataChange"
        clearable
      />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted, watch } from "vue";

const emits = defineEmits(["change"]);
const { t, locale } = useI18n();
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
const initData = () => {
  form.value = props.res[locale.value].edu;
};
const dataChange = () => {
  emits("change", form.value, locale.value, "edu");
};
const form = ref({
  school: "",
  major: "",
});
const validateData = () => {
  return form.value.major && form.value.school;
};
// 监听语言变化
watch(locale, () => initData());

onMounted(() => initData());
defineExpose({
  validateData,
});
</script>
<style lang="less" scoped>
.edu {
  text-align: left;
  padding: 0 16px;
}
</style>
