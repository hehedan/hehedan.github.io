import html2canvas from "html2canvas";

// 生成图片
export const creatImg = (scrollLength) => {
  const element = document.body;
  // 获取当前页面的滚动位置
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollLeft =
    document.documentElement.scrollLeft || document.body.scrollLeft;

  console.log(scrollTop, scrollLeft);

  // 首先让页面滚动到最上方
  window.scrollTo(0, 0);

  const setup = {
    useCORS: true, // 使用跨域
    scrollY: scrollLength,
    logging: true,
    scale: 1,
    height: scrollLength,
    windowHeight: scrollLength,
  };
  html2canvas(element, setup).then((canvas) => {
    const link = canvas.toDataURL("image/jpg");
    exportPicture(link, "Jayce的简介");
    // 恢复页面滚动位置
    window.scrollTo(scrollLeft, scrollTop);
  });
};

// 导出图片
export const exportPicture = (link, name = "未命名文件") => {
  const file = document.createElement("a");
  file.style.display = "none";
  file.href = link;
  file.download = decodeURI(name);
  document.body.appendChild(file);
  file.click();
  document.body.removeChild(file);
};
