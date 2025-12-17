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
import { nextTick, reactive, ref } from "vue";
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
const resumeData = reactive({ zh: {}, en: {}, sys: {} });

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
// const dataChange = (
//   v,
//   lang,
//   objType,
//   needJsonStringify,
//   needAll,
//   isAdd,
//   emptyItem,
//   needOrder = false,
//   index = -1,
//   isUp = false
// ) => {
//   if (needJsonStringify) {
//     resumeData[lang][objType]["list"] = JSON.stringify(v);
//     const otherLang = lang === "zh" ? "en" : "zh";
//     const oldDataStr = resumeData[otherLang][objType]["list"];
//     const oldData = JSON.parse(oldDataStr);
//     if (needAll) {
//       if (isAdd) {
//         oldData.push(emptyItem);
//       } else {
//         oldData.splice(emptyItem, 1);
//       }
//       resumeData[otherLang][objType]["list"] = JSON.stringify(oldData);
//       return;
//     }
//     if (needOrder) {
//       if (isUp) {
//         const temp = oldData[index];
//         oldData[index] = oldData[index - 1];
//         oldData[index - 1] = temp;
//       } else {
//         const temp = oldData[index];
//         oldData[index] = oldData[index + 1];
//         oldData[index + 1] = temp;
//       }
//       resumeData[otherLang][objType]["list"] = JSON.stringify(oldData);
//     }
//   } else {
//     resumeData[lang][objType] = v;
//   }
// };
// 前提：resumeData = ref({ zh: {}, en: {}, sys: {} })
const dataChange = (
  v,
  lang,
  objType,
  needJsonStringify,
  needAll,
  isAdd,
  emptyItem,
  needOrder = false,
  index = -1,
  isUp = false
) => {
  if (needJsonStringify) {
    // ******** 1. 处理当前语言的list数据（响应式更新）********
    // 方式：创建新对象替换旧对象，触发响应式
    resumeData[lang] = {
      ...resumeData[lang], // 保留原有属性
      [objType]: {
        ...(resumeData[lang][objType] || {}), // 保留objType原有属性
        list: JSON.stringify(v), // 替换新的list
      },
    };

    // ******** 2. 处理另一语言的list数据（响应式更新）********
    const otherLang = lang === "zh" ? "en" : "zh";
    // 先获取旧数据（处理空值情况）
    const oldDataStr = resumeData[otherLang]?.[objType]?.list || "[]";
    const oldData = JSON.parse(oldDataStr);

    if (needAll) {
      // 添加/删除项：操作数组后，重新生成新对象
      if (isAdd) {
        oldData.push(emptyItem);
      } else {
        oldData.splice(emptyItem, 1);
      }
      // 替换旧值，触发响应式
      resumeData[otherLang] = {
        ...resumeData[otherLang],
        [objType]: {
          ...(resumeData[otherLang][objType] || {}),
          list: JSON.stringify(oldData),
        },
      };
      return;
    }

    if (needOrder) {
      // 调整顺序：操作数组后，重新生成新对象
      if (isUp && index > 0) {
        // 边界判断：避免index-1越界
        [oldData[index], oldData[index - 1]] = [
          oldData[index - 1],
          oldData[index],
        ]; // 解构交换，更简洁
      } else if (!isUp && index < oldData.length - 1) {
        // 边界判断：避免index+1越界
        [oldData[index], oldData[index + 1]] = [
          oldData[index + 1],
          oldData[index],
        ];
      }
      // 替换旧值，触发响应式
      resumeData[otherLang] = {
        ...resumeData[otherLang],
        [objType]: {
          ...(resumeData[otherLang][objType] || {}),
          list: JSON.stringify(oldData),
        },
      };
    }
  } else {
    // 处理非JSON序列化的属性：同样用新对象替换触发响应式
    resumeData[lang] = {
      ...resumeData[lang],
      [objType]: v, // 替换新值
    };
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
  localStorage.setItem("resume_data", JSON.stringify(resumeData));
  if (!validateData()) return message.error(t("const.input"));
  changeLang();
  nextTick(async () => {
    if (!validateData()) return message.error(t("const.input"));
    message.info(t("const.loading"));
    const version = updateVersion(resumeData.sys.version);
    resumeData.sys.updateTime = getTimeStr(new Date());
    resumeData.sys.version = version;
    console.log("保存的数据是---------", JSON.stringify(resumeData, null, 2));
    const res1 = await api_updateContent(
      "sys.json",
      JSON.stringify(resumeData.sys)
    );
    const res2 = await api_updateContent(
      "zh.json",
      JSON.stringify(resumeData.zh)
    );
    const res3 = await api_updateContent(
      "en.json",
      JSON.stringify(resumeData.en)
    );
    Promise.all([res1, res2, res3])
      .then((ress) => {
        if (ress.every((res) => res.code === 200)) {
          message.success(t("const.successl"));
          isEdit.value = false;
          btnRef.value.setIsEdit(false);
          changeLang();
          console.log(resumeData, "--------------");
        } else {
          changeLang();
          message.error(t("const.faill"));
        }
      })
      .catch((err) => {
        changeLang();
        message.error(t("const.faill"));
      });
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
    const _resumeData = JSON.parse(data);
    resumeData.en = _resumeData.en;
    resumeData.zh = _resumeData.zh;
    resumeData.sys = _resumeData.sys;
    console.log("加载的数据是---------", JSON.stringify(resumeData, null, 2));
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
