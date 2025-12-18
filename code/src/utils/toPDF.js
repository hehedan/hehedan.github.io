// 尺寸常量
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PDF_MARGIN_MM = 10;
const PDF_CONTENT_WIDTH_MM = A4_WIDTH_MM - PDF_MARGIN_MM * 2; // 190mm
const PDF_CONTENT_HEIGHT_MM = A4_HEIGHT_MM - PDF_MARGIN_MM * 2; // 277mm

// 1mm = 3.7795275590551 像素（96 DPI）
const MM_TO_PX = 3.7795275590551;
// 图片质量配置
const IMAGE_QUALITY = 0.95;
const IMAGE_FORMAT = "image/png";
import { snapdom } from "@zumer/snapdom";
import { jsPDF } from "jspdf";
import { getNoBlankHeight, listSum } from "./index";

/**
 * 将 DOM 元素转换为图片
 */
export async function captureElementToImage(element, quality = IMAGE_QUALITY) {
  return new Promise(async (resolve) => {
    console.log("开始截图...");

    // 保存原始样式
    const originalOverflow = element.style.overflow;
    const originalHeight = element.style.height;
    const originalMaxHeight = element.style.maxHeight;

    // 临时设置样式，确保完整截图
    element.style.overflow = "visible";
    element.style.height = "auto";
    element.style.maxHeight = "none";

    try {
      // 核心：使用 snapdom 进行截图
      const capture = await snapdom(element, {
        scale: 2, // 2倍清晰度
        quality: quality,
      });

      // // 优先使用 toPng()
      // const imgElement = await capture.toPng();
      // const dataUrl = imgElement.src;
      // let dataUrl = "";
      // 验证数据有效性
      // if (!dataUrl || dataUrl.length < 100) {
      // console.log("toPng 返回无效，尝试 toCanvas...");
      const canvas = await capture.toCanvas();
      canvas.toBlob((blob) => {
        const pageDataUrl = URL.createObjectURL(blob);
        console.log("toCanvas 成功，dataUrl:", pageDataUrl);
        resolve({ url: pageDataUrl, size: blob.size });
      });
      // return canvas.toDataURL(IMAGE_FORMAT, quality);
      // }

      // console.log("截图成功，大小:", (dataUrl.length / 1024).toFixed(2), "KB");
      // return dataUrl;
    } finally {
      // 恢复原始样式
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      element.style.maxHeight = originalMaxHeight;
    }
  });
}

export async function splitImageIntoPages(imageDataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      const pages = [];
      const originalWidth = img.width;
      const originalHeight = img.height;

      // 将 A4 内容区域转换为像素（考虑 scale=2）
      const pageContentHeightPx = Math.floor(
        PDF_CONTENT_HEIGHT_MM * MM_TO_PX * 2 // scale=2
      );
      const pageContentWidthPx = Math.floor(
        PDF_CONTENT_WIDTH_MM * MM_TO_PX * 2
      );

      // 计算缩放比例（图片宽度适配页面宽度）
      const widthScale = pageContentWidthPx / originalWidth;
      const scaledHeight = originalHeight * widthScale;
      console.log(`原始尺寸: ${originalWidth}x${originalHeight}px`);
      console.log(`缩放后高度: ${scaledHeight}px`);
      if (scaledHeight <= pageContentHeightPx) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = pageContentWidthPx;
        canvas.height = scaledHeight;
        // 高质量渲染
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        // 绘制当前页内容
        ctx.drawImage(
          img,
          0,
          0, // 源图片起始位置
          originalWidth,
          originalHeight, // 源图片尺寸
          0,
          0, // 目标起始位置
          pageContentWidthPx,
          scaledHeight // 目标尺寸
        );

        // 转换为 data URL
        const pageDataUrl = canvas.toDataURL(IMAGE_FORMAT, IMAGE_QUALITY);

        pages.push({
          dataUrl: pageDataUrl,
          width: pageContentWidthPx,
          height: scaledHeight,
        });
      } else {
        let img_needHandleHeight = originalHeight;
        let pageNum = 1;
        let heights = [];
        while (img_needHandleHeight > 0) {
          // 单次处理的图片高度
          const onceHandleImgHeight = pageContentHeightPx / widthScale;

          let lineY =
            onceHandleImgHeight * pageNum - listSum(heights, pageNum - 2);

          // 测试看下分割高度
          const height = await getNoBlankHeight(
            40,
            [255, 255, 255],
            img,
            lineY,
            originalWidth,
            2
          );
          console.log(height, "---height");
          heights.push(height);

          // 创建新 Canvas
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          canvas.width = pageContentWidthPx;

          let currentPageHeight = onceHandleImgHeight - height;
          let height_canvas = currentPageHeight * widthScale;
          canvas.height = height_canvas;

          // 绘制当前页内容
          ctx.drawImage(
            img,
            0,
            ((pageNum - 1) * pageContentHeightPx) / widthScale -
              listSum(heights, pageNum - 2), // 源图片起始位置
            originalWidth,
            currentPageHeight, // 源图片尺寸
            0,
            0, // 目标起始位置
            pageContentWidthPx,
            height_canvas // 目标尺寸
          );

          console.log(`第 ${pageNum} 页处理完成`);
          // 转换为 data URL
          const pageDataUrl = canvas.toDataURL(IMAGE_FORMAT, IMAGE_QUALITY);

          pages.push({
            dataUrl: pageDataUrl,
            width: pageContentWidthPx,
            height: height_canvas,
          });
          pageNum++;
          img_needHandleHeight -= currentPageHeight;
          console.log(img_needHandleHeight, "---剩下的多少");
          // 解决最后一页没有内容
          if (img_needHandleHeight < 1) {
            img_needHandleHeight = 0;
          }
        }
      }

      resolve(pages);
    };

    img.onerror = () => reject(new Error("图片加载失败"));
    img.src = imageDataUrl;
  });
}

/**
 * 从分页图片创建 PDF
 */
export function createPdfFromPages(pages) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true, // 启用压缩，减小文件体积
  });

  if (pages.length === 0) {
    throw new Error("没有可添加的页面");
  }

  pages.forEach((page, index) => {
    // 第一页直接用，后续需要 addPage
    if (index > 0) {
      pdf.addPage();
    }

    // 像素转毫米（考虑 scale=2）
    const scaleFactor = 2;
    const pageHeightMm = page.height / MM_TO_PX / scaleFactor;

    // 图片适配内容区域宽度
    const finalWidth = PDF_CONTENT_WIDTH_MM; // 190mm
    const finalHeight = pageHeightMm;

    // 位置：左上角对齐，保留 10mm 边距
    const x = PDF_MARGIN_MM;
    const y = PDF_MARGIN_MM;

    console.log(
      `添加第 ${index + 1} 页: ${finalWidth}x${finalHeight.toFixed(2)}mm`
    );

    // 添加图片到 PDF
    pdf.addImage(page.dataUrl, "PNG", x, y, finalWidth, finalHeight);
  });

  return pdf;
}

/**
 * 主导出函数
 */
export async function exportMessagesToPdf(config) {
  const {
    targetSelector,
    filename = "messages.pdf",
    quality = IMAGE_QUALITY,
  } = config;

  console.log("=== 开始导出 PDF ===");

  // 1. 获取目标元素
  const element = document.querySelector(targetSelector);
  if (!element) {
    throw new Error(`元素未找到: ${targetSelector}`);
  }

  console.log("元素尺寸:", {
    width: element.offsetWidth,
    height: element.scrollHeight,
  });

  // 2. DOM 截图
  const { url, size } = await captureElementToImage(element, quality);
  console.log("截图完成，大小:", (size / 1024).toFixed(2), "KB");

  // 3. 图片分页
  const pages = await splitImageIntoPages(url);
  console.log(`分页完成，共 ${pages.length} 页`);

  // 4. 创建 PDF
  const pdf = createPdfFromPages(pages);

  // 5. 保存文件
  pdf.save(filename);
  console.log("=== 导出完成 ===");
}
