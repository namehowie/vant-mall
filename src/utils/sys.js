/**
 * @description 获取图片地址
 * @export {function}
 * @param {string} dateStr 日期字符串，格式为yyyy-MM-dd HH:mm:ss
 * @returns {str} 图片地址
 */
export function readFile(fileName) {
  return `${process.env.VUE_APP_BASE_API}/readFile?fileName=${fileName}`;
}
