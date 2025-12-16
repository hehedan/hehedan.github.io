<template>
  <section id="basic" class="basic">
    <section class="basic-info">
      <div class="basic-info-name">
        <div v-if="!isEdit">{{ t("basic.name") }}</div>
        <n-input
          v-else
          size="small"
          style="width: 80%"
          v-model:value="form.name"
          :status="form.name ? '' : 'error'"
          :placeholder="t('const.input')"
          @update:value="dataChange"
          clearable
        />
      </div>
      <div>
        <div v-if="!isEdit">{{ t("basic.job") }}</div>
        <n-input
          v-else
          size="small"
          style="width: 80%"
          v-model:value="form.job"
          :status="form.job ? '' : 'error'"
          :placeholder="t('const.input')"
          @update:value="dataChange"
          clearable
        />
      </div>
      <div>
        <div v-if="!isEdit">{{ t("basic.tel") }}</div>
        <n-input
          v-else
          size="small"
          style="width: 80%"
          v-model:value="form.tel"
          :status="form.tel ? '' : 'error'"
          :placeholder="t('const.input')"
          @update:value="dataChange"
          clearable
        />
      </div>
      <div>
        <div v-if="!isEdit">{{ t("basic.email") }}</div>
        <n-input
          v-else
          size="small"
          style="width: 80%"
          v-model:value="form.email"
          :status="form.email ? '' : 'error'"
          :placeholder="t('const.input')"
          @update:value="dataChange"
          clearable
        />
      </div>
    </section>
    <img src="../assets/img/avatar.webp" alt="avatar" />
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted, watch } from "vue";

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
const form = ref({
  name: "",
  job: "",
  tel: "",
  email: "",
});
const { t, locale } = useI18n();
const initData = () => {
  form.value = props.res[locale.value].basic;
};
const dataChange = () => {
  emits("change", form.value, locale.value, "basic");
};
const validateData = () => {
  return (
    form.value.name && form.value.job && form.value.tel && form.value.email
  );
};
// 监听语言变化
watch(locale, () => initData());

onMounted(() => initData());
defineExpose({
  validateData,
});
</script>

<style lang="less" scoped>
.basic {
  @flex-row();
  @padding();
  &-info {
    text-align: left;
    flex: 1;
    margin-right: 16px;
    &-name {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 6px;
    }
  }
  img {
    width: 88px;
    border-radius: 6px;
  }
}
</style>
