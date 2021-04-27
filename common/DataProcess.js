/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-19 16:19:00
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-19 16:19:00
 */
function getMinMax(data, marginScale) {
  let res = [];
  marginScale = marginScale || 0;
  for (let i = 0; i < data[0].length; i++) {
    let wi = data.map(wT => wT[i]);
    let min = wi.reduce((m, v) => Math.min(m, v), Infinity);
    let max = wi.reduce((m, v) => Math.max(m, v), -Infinity);
    let diff = max - min;
    min -= marginScale * diff;
    max += marginScale * diff;
    res.push({ min, max });
  }
  return res;
}