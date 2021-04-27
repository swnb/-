/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-20 11:43:38
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-05 22:22:38
 */
function convertToRGBA(color) {
  let el = document.createElement('div');
  el.style.color = color;
  el.style.display = 'none';
  document.body.append(el);
  color = getComputedStyle(el).color;
  el.remove();
  return color;
}

function convertToArray(color) {
  color = convertToRGBA(color);
  if (color.startsWith('rgba')) {
    color = JSON.parse(color.replace('rgba', '').replace('(', '[').replace(')', ']'));
    color[color.length - 1] = parseInt(color[color.length - 1] * 255);
  }
  if (color.startsWith('rgb')) {
    color = JSON.parse(color.replace('rgb', '').replace('(', '[').replace(')', ']'));
    color.push(255);
  }
  return color;
}

// setTimeout(() => {
//   getColor('red');
//   getColor('yellow');
//   getColor('#f0f0f0');
//   getColor('rgb(12,33,66)');
//   getColor('rgba(12,33,66, 0.2)');
// }, 100)