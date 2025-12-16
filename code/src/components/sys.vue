<template>
  <section class="sys">
    <div>
      {{
        t("const.version") +
        "：" +
        (sys.version || "1.0.0") +
        " - " +
        (sys.updateTime || "2025-12-11 00:00:00")
      }}
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps({
  sys: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.sys {
  font-size: 12px;
  color: var(--scroll-color);
}
</style>
