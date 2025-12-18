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
export function getTimeStr(idate, forFile = false) {
  const year = idate.getFullYear();
  const month = String(idate.getMonth() + 1).padStart(2, "0");
  const date = String(idate.getDate()).padStart(2, "0");
  const hours = String(idate.getHours()).padStart(2, "0");
  const minutes = String(idate.getMinutes()).padStart(2, "0");
  const seconds = String(idate.getSeconds()).padStart(2, "0");
  if (forFile) {
    return `${year}-${month}-${date} ${hours}-${minutes}-${seconds}`;
  } else {
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  }
}

export async function isImageBlank(
  rgb = [],
  img,
  sourceStartY,
  originalWidth,
  height = 1
) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = originalWidth;
      canvas.height = height;
      // 绘制图片到Canvas
      ctx.drawImage(
        img,
        0,
        sourceStartY - height, // 源图片起始位置
        originalWidth,
        height, // 源图片尺寸
        0,
        0, // 目标起始位置
        originalWidth,
        height // 目标尺寸
      );
      // 获取像素数据（Uint8ClampedArray，长度为width*height*4）
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let isBalnk = true; // 标记是否纯黑

      // 遍历所有像素（每4个值为一个像素：R, G, B, A）
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]; // 红
        const g = data[i + 1]; // 绿
        const b = data[i + 2]; // 蓝
        const a = data[i + 3]; // 透明度（0=全透，255=不透明）
        if (a === 0) continue; // 跳过透明像素

        // 检测是否纯黑（R=0, G=0, B=0）
        if (r !== rgb[0] || g !== rgb[1] || b !== rgb[2]) {
          isBalnk = false;
          break;
        }
      }
      console.log(isBalnk, "---isBlank");
      // 清理canvas
      canvas.remove();
      resolve(isBalnk);
    } catch (err) {
      reject(new Error(`像素检测失败：${err.message}`));
    }
  });
}

export async function getNoBlankHeight(
  num = 10,
  rgb = [],
  img,
  sourceStartY,
  originalWidth,
  height = 1
) {
  let i = 0;
  // 第一步：检测初始位置是否为空白
  const isBlank = await isImageBlank(
    rgb,
    img,
    sourceStartY,
    originalWidth,
    height
  );

  // 如果初始位置就是空白，返回明确的语义值（比如0，或根据业务改-1）
  if (isBlank) {
    return 0; // 或 return -1 表示“起始位置即空白”
  }

  // 第二步：向上循环检测，最多num次
  while (i < num) {
    i++; // 第i次检测（1~num）
    console.log(i, "---向上找");
    const currentY = sourceStartY - i * height;
    const _isBlank = await isImageBlank(
      rgb,
      img,
      currentY,
      originalWidth,
      height
    );

    // 找到空白，返回向上偏移的像素高度（i * height）
    if (_isBlank) {
      return i * height;
    }
  }

  // 循环结束未找到空白，返回明确的语义值（比如num * height，或-1）
  // 注意：不要返回i（次数），要和上面的返回值类型统一（像素高度）
  return num * height; // 或 return -1 表示“未找到空白”
}

export function listSum(list, index) {
  let sum = 0;
  if (index < 0) return sum;
  if (index === 0) return list[0];
  if (index > list.length - 1) return sum;
  for (let i = 0; i <= index; i++) {
    sum += list[i];
  }
  return sum;
}
