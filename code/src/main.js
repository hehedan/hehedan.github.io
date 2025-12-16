import { createApp } from "vue";
import "./assets/css/index.less";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import { loadAllLangFiles } from "./utils/index";
const app = createApp(App);

// 配置自动导入组件
import {
  create,
  NButton,
  NGradientText,
  NConfigProvider,
  NSelect,
  NButtonGroup,
  NIcon,
  NBadge,
  NDivider,
  NBackTop,
  NInput,
  NDrawer,
  NDrawerContent,
} from "naive-ui";

const naive = create({
  components: [
    NDivider,
    NButton,
    NGradientText,
    NConfigProvider,
    NSelect,
    NButtonGroup,
    NIcon,
    NBadge,
    NBackTop,
    NInput,
    NDrawer,
    NDrawerContent,
  ],
});
app.use(naive);
//

export const messageCompiler = (message, { locale, key, onError }) => {
  if (typeof message === "string") {
    /**
     * You can tune your message compiler performance more with your cache strategy or also memoization at here
     */
    return () => {
      return message;
    };
  } else {
    /**
     * for AST.
     * If you would like to support it,
     * You need to transform locale messages such as `json`, `yaml`, etc. with the bundle plugin.
     */
    onError && onError(new Error("not support for AST"));
    return () => key;
  }
};
// 国际化
const i18n = createI18n({
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: {},
  compiler: false,
  messageCompiler,
});
app.use(i18n);

const initWord = async () => {
  const data = await loadAllLangFiles();
  i18n.global.setLocaleMessage("zh", data.zh);
  i18n.global.setLocaleMessage("en", data.en);
  localStorage.setItem("resume_data", JSON.stringify(data));

  setTimeout(() => {
    const loadingDiv = document.getElementById("loading");
    loadingDiv.style.display = "none";
    app.mount("#app");
  }, 1000);
};

initWord();
