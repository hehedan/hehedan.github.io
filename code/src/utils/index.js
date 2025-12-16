export async function loadAllLangFiles(langs = ["zh", "en", "sys"]) {
  const promises = langs.map((lang) =>
    fetch(`${import.meta.env.BASE_URL}${lang}.json`).then((res) => res.json())
  );
  const [zhData, enData, sysData] = await Promise.all(promises);
  return { zh: zhData, en: enData, sys: sysData };
}

/**
 * 版本号更新算法
 * @param {string} currentVersion - 当前版本号（如"1.0.0"）
 * @returns {string} - 更新后的版本号
 */
export function updateVersion(currentVersion) {
  // 1. 将版本号拆分为数字数组（x, y, z）
  let [major, minor, patch] = currentVersion.split(".").map(Number);

  // 3. 执行版本更新逻辑：末位+1，满10进1
  patch += 1; // 末位先+1
  if (patch === 10) {
    patch = 0; // 末位重置为0
    minor += 1; // 中间位+1
    if (minor === 10) {
      minor = 0; // 中间位重置为0
      major += 1; // 首位+1
    }
  }

  // 4. 拼接为新的版本号字符串
  return `${major}.${minor}.${patch}`;
}

// js写一个获取当前时间格式 yyyy-MM-dd HH:mm:ss
export function getTimeStr(idate) {
  const year = idate.getFullYear();
  const month = String(idate.getMonth() + 1).padStart(2, "0");
  const date = String(idate.getDate()).padStart(2, "0");
  const hours = String(idate.getHours()).padStart(2, "0");
  const minutes = String(idate.getMinutes()).padStart(2, "0");
  const seconds = String(idate.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}
