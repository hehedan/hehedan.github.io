<template>
  <n-config-provider :theme="theme" :locale="Nlocale" :date-locale="dateLocale">
    <main>
      <btn
        ref="btnRef"
        @theme-change="themeChange"
        @lang-change="langChange"
        @select-change="selectChange"
        @save="save"
        @edit="edit"
        :isEdit="isEdit"
      />
      <div class="main-container" id="main-container" ref="maincRef">
        <basic
          ref="basicRef"
          :isEdit="isEdit"
          :res="resumeData"
          @change="dataChange"
        />
        <summaryMe
          ref="summaryRef"
          :isEdit="isEdit"
          :res="resumeData"
          @change="dataChange"
        />
        <edu
          ref="eduRef"
          :isEdit="isEdit"
          :res="resumeData"
          @change="dataChange"
        />
        <job
          ref="jobRef"
          :isEdit="isEdit"
          :res="resumeData"
          @change="dataChange"
        />
        <project
          ref="projectRef"
          :isEdit="isEdit"
          :res="resumeData"
          @change="dataChange"
        />
        <projectMe
          ref="projectMeRef"
          :isEdit="isEdit"
          :res="resumeData"
          @change="dataChange"
        />
        <n-back-top :right="30" :bottom="30" />
      </div>
      <sys :sys="resumeData.sys" />
    </main>
  </n-config-provider>
</template>

<script setup>
import { ref } from "vue";
import { darkTheme, lightTheme, zhCN, dateZhCN } from "naive-ui";
import basic from "./components/basic.vue";
import job from "./components/job.vue";
import sys from "./components/sys.vue";
import edu from "./components/edu.vue";
import summaryMe from "./components/summary.vue";
import project from "./components/project.vue";
import projectMe from "./components/project_me.vue";
import btn from "./components/btn.vue";
import { api_updateContent } from "./utils/githubApi";
import { createDiscreteApi } from "naive-ui";
import { useI18n } from "vue-i18n";
import { updateVersion, getTimeStr } from "./utils/index";

const basicRef = ref(null);
const maincRef = ref(null);
const summaryRef = ref(null);
const eduRef = ref(null);
const jobRef = ref(null);
const projectRef = ref(null);
const projectMeRef = ref(null);
const btnRef = ref(null);

const { locale, t } = useI18n();
const { message } = createDiscreteApi(["message"]);
const theme = ref(null);
const isZh = ref(true);
const Nlocale = ref(null);
const dateLocale = ref(null);
const isEdit = ref(false);
const resumeData = ref();

const selectChange = (v) => {
  const targetElement = document.getElementById(v);
  const parentElement = document.getElementById("main-container");
  if (targetElement && parentElement) {
    parentElement.scrollTo({
      top: targetElement.offsetTop - 60,
      behavior: "smooth",
    });
  }
};
const dataChange = (
  v,
  lang,
  objType,
  needJsonStringify,
  needAll,
  isAdd,
  emptyItem
) => {
  if (needJsonStringify) {
    resumeData.value[lang][objType]["list"] = JSON.stringify(v);
    if (needAll) {
      const otherLang = lang === "zh" ? "en" : "zh";
      const oldDataStr = resumeData.value[otherLang][objType]["list"];
      const oldData = JSON.parse(oldDataStr);
      if (isAdd) {
        oldData.push(emptyItem);
      } else {
        oldData.splice(emptyItem, 1);
      }
      resumeData.value[otherLang][objType]["list"] = JSON.stringify(oldData);
    }
  } else {
    resumeData.value[lang][objType] = v;
  }
};
const validateData = () => {
  const basicFlag = basicRef.value.validateData();
  if (!basicFlag) return false;
  const summaryFlag = summaryRef.value.validateData();
  if (!summaryFlag) return false;
  const eduFlag = eduRef.value.validateData();
  if (!eduFlag) return false;
  const jobFlag = jobRef.value.validateData();
  if (!jobFlag) return false;
  const projectFlag = projectRef.value.validateData();
  if (!projectFlag) return false;
  const projectMeFlag = projectMeRef.value.validateData();
  if (!projectMeFlag) return false;
  return true;
};
const changeLang = () => {
  isZh.value = !isZh.value;
  locale.value = isZh.value ? "zh" : "en";
  btnRef.value.setIsZh(isZh.value);
};
const save = async () => {
  if (!validateData()) return message.error(t("const.input"));
  changeLang();
  if (!validateData()) return;
  message.info(t("const.loading"));
  const version = updateVersion(resumeData.value.sys.version);
  resumeData.value.sys.updateTime = getTimeStr(new Date());
  resumeData.value.sys.version = version;
  console.log(
    "保存的数据是---------",
    JSON.stringify(resumeData.value, null, 2)
  );

  const res1 = await api_updateContent(
    "sys.json",
    JSON.stringify(resumeData.value.sys)
  );
  const res2 = await api_updateContent(
    "zh.json",
    JSON.stringify(resumeData.value.zh)
  );
  const res3 = await api_updateContent(
    "en.json",
    JSON.stringify(resumeData.value.en)
  );
  Promise.all([res1, res2, res3])
    .then((ress) => {
      if (ress.every((res) => res.code === 200)) {
        message.success(t("const.successl"));
        isEdit.value = false;
        btnRef.value.setIsEdit(false);
        changeLang();
      } else {
        message.error(t("const.faill"));
      }
    })
    .catch((err) => {
      message.error(t("const.faill"));
    });
};
const themeChange = (isDark) => {
  theme.value = isDark ? darkTheme : lightTheme;
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
};

const langChange = (val) => {
  maincRef.value.scrollTo(0, 0);
  isZh.value = val;
  locale.value = val ? "zh" : "en";
  dateLocale.value = val ? dateZhCN : null;
  Nlocale.value = val ? zhCN : null;
  document.title = val ? "我的简历" : "My Resume";
};
const edit = (v) => {
  isEdit.value = v;
};
const init = () => {
  theme.value = lightTheme;
  if (location.pathname.includes("edit")) {
    isEdit.value = true;
  }
  const data = localStorage.getItem("resume_data");
  if (data) {
    resumeData.value = JSON.parse(data);
    console.log(
      "加载的数据是---------",
      JSON.stringify(resumeData.value, null, 2)
    );
  }
};
init();
</script>

<style scoped lang="less">
main {
  height: 100%;
  background: var(--bg);
  color: var(--text-color);
  width: 100%;
  max-width: 666px;
  position: relative;
  @shadow();
  background-image: url("./assets/img/sit.webp");
  background-position: bottom right;
  /* 垂直靠底、水平居中（关键） */
  background-size: 30% auto;
  /* 宽度占满 div，高度自动（保持宽高比） */
  background-repeat: no-repeat;
  /* 禁止图片重复 */
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  .main-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--scroll-color);
  border-radius: 6px;
}
</style>
