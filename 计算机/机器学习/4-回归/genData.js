/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-08 21:56:14
 * @LastEditors: chenbh
 * @LastEditTime: 2021-02-10 00:20:51
 */
function genData() {
  let k = Math.random() * 4 - 2;
  let b = Math.random() * 200 - 100;

  let E = 10;

  let data = [];
  let N = 30;
  for(let i=0;i<N;i++) {
    let x = Math.random() * 200 - 100;
    let y = k * x + b + 2 * E * Math.random() - E;
    data.push([x, y]);
  }

  return {data, k, b, E};
}
