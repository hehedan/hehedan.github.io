import { Octokit } from "@octokit/rest";
import { responseStatus } from "./const";
import { getTimeStr } from "./index";

let octokit = null;

export const initOctokit = (token) => {
  if (octokit) return octokit;
  octokit = new Octokit({
    auth: token,
  });
  return octokit;
};

const projectInfo = {
  owner: "hehedan",
  repo: "hehedan.github.io",
};

/**
 * 修复 Base64 解码中文乱码问题：Base64 字符串 → UTF-8 字符串
 * @param {string} base64Str - GitHub 返回的 Base64 编码内容
 * @returns {string} 解码后的 UTF-8 字符串
 */
function base64ToUtf8(base64Str) {
  // 步骤 1：Base64 转字节数组（处理非 ASCII 字符）
  const binaryStr = atob(base64Str);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  // 步骤 2：字节数组转 UTF-8 字符串（关键：确保中文编码正确）
  return new TextDecoder("utf-8").decode(bytes);
}

function safeBtoa(str) {
  // 1. 将字符串转为 UTF-8 编码的 Uint8Array
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(str);

  // 2. 将 Uint8Array 转为 Latin1 字符串（逐个字节处理）
  let latin1Str = "";
  for (let i = 0; i < uint8Array.length; i++) {
    latin1Str += String.fromCharCode(uint8Array[i]);
  }

  // 3. 用 btoa 编码
  return btoa(latin1Str);
}
export const api_loadContent = async (fileName, token) => {
  const octokitInstance = initOctokit(token);
  const responseObj = {
    code: 200,
    data: {},
    msg: "",
  };
  try {
    const response = await octokitInstance.rest.repos.getContent({
      ...projectInfo,
      path: fileName,
    });
    const content = base64ToUtf8(response.data.content); // GitHub 返回的是 Base64 编码，需解码
    const data = JSON.parse(content);
    responseObj.code = responseStatus.success;
    responseObj.data = data;
    return responseObj;
  } catch (err) {
    responseObj.code = responseStatus.error;
    responseObj.msg = err.message;
    return responseObj;
  }
};

export const api_updateContent = async (fileName, content, token) => {
  const octokitInstance = initOctokit(token);
  const repoInfo = {
    ...projectInfo,
    path: fileName,
  };
  const responseObj = {
    code: 200,
    data: {},
    msg: "",
  };
  try {
    // 先获取文件的 SHA（GitHub 要求修改文件时传入）
    const getResponse = await octokitInstance.rest.repos.getContent(repoInfo);
    const sha = getResponse.data.sha;
    // 提交修改
    await octokitInstance.rest.repos.createOrUpdateFileContents({
      ...repoInfo,
      sha,
      message: `更新网站内容---${getTimeStr(new Date())}`, // Git 提交信息
      content: safeBtoa(content), // 内容 Base64 编码后提交
    });

    return responseObj;
  } catch (err) {
    console.error("提交数据失败---------", err);
    responseObj.code = responseStatus.error;
    responseObj.msg = err.message;
    return responseObj;
  }
};
