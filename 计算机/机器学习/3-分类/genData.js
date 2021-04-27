/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-08 21:56:14
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-06 19:03:46
 */
function genData() {
  let o1x = Math.random() * 10;
  let o1y = Math.random() * 10;

  let R = 3;
  let D = 2 * R + 2;

  let alpha = Math.random() * 2 * Math.PI;

  let o2x = o1x + D * Math.cos(alpha);
  let o2y = o1y + D * Math.sin(alpha);

  let N = 20;
  let data = [];
  for (let i = 0; i < N; i++) {
    let r = Math.random() * R;
    let theta = Math.random()  * 2 * Math.PI;
    let x = o1x + r * Math.cos(theta);
    let y = o1y + r * Math.sin(theta);
    data.push([x, y, 0]);
  }
  for (let i = 0; i < N; i++) {
    let r = Math.random() * R;
    let theta = Math.random()  * 2 * Math.PI;
    let x = o2x + r * Math.cos(theta);
    let y = o2y + r * Math.sin(theta);
    data.push([x, y, 1]);
  }
  
  return data;
}
