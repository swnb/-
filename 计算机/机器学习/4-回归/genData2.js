/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-08 21:56:14
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-04 16:18:00
 */
function genData() {
  let w1 = Math.random() * 2 - 1;
  let w2 = Math.random() * 2 - 1;

  let E = 3;

  let data = [];
  let N = 30;
  for (let i = 0; i < N; i++) {
    let x1 = Math.random() * 200 - 100;
    let x2 = Math.random() * 200 - 100;
    let e = 2 * E * Math.random() - E;
    let y = w1 * x1 + w2 * x2 + e;
    data.push([x1, x2, y]);
  }

  return { data, w: [w1, w2], E };
}
