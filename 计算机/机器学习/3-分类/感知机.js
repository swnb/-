/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-08 22:09:17
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-18 15:08:19
 */
function 感知机(data, η = 1E-0) {
  let d = data[0].length - 1;
  η = Math.min(1, Math.max(1E-5, η));
  let N = data.length * 1000;
  let i = 0;
  let n = 0;
  let wT = Matrix.zeros(1, d + 1);
  let wTs = [];
  while (i < data.length) {
    let row = data[i];
    let xT = new Matrix([[...row.slice(0, row.length - 1), 1]]);
    let y = row[row.length - 1];
    if (y === 0) y = -1;
    if (y * wT.product(xT.transpose())[0][0] <= 0) {
      wT = wT.add(xT.scale(η * y));
      wTs.push(wT);
      i = 0;
      n++;
    } else {
      i++;
    }
    if (n >= N) {
      break;
    }
  }

  return { wT: wT[0], wTs: wTs.map(wT => wT[0]) };
}
