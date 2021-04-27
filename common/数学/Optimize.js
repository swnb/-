/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-17 10:17:36
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-18 15:05:00
 */
const Optimize = {
  /**
   * 梯度下降
   * Gradient Descent
   */
  GD(J_w, wTInit, η = 1E-5, N = 500, e = 1E-6) {
    let Jw;
    let wT = wTInit;
    let wTs = [];
    if (e < 0) e = 1E-6;
    for (let i = 0; i < N; i++) {
      Jw = J_w(wT);
      wT = wT.sub(Jw.scale(η));
      wTs.push(wT);
      let JwNormal = Jw.product(Jw.transpose())[0][0];
      if (JwNormal <= e) {
        console.log('break')
        break;
      }
    }

    return { wT: wT[0], wTs: wTs.map(wT => wT[0]) };
  },
  NewtonsMethod(J_w, H_w, wTInit, N = 500, e = 1E-6) {
    let Jw;
    let Hw;
    let wT = wTInit;  // 1*m
    let wTs = [];
    if (e < 0) e = 1E-6;
    for (let i = 0; i < N; i++) {
      Jw = J_w(wT); // 1*m
      Hw = H_w(wT); // m*m
      wT = wT.sub(Jw.product(Hw.inverse(e ** 8)));
      wTs.push(wT);
      let JwNormal = Jw.product(Jw.transpose())[0][0];
      if (JwNormal <= e) {
        console.log('break')
        break;
      }
    }

    return { wT: wT[0], wTs: wTs.map(wT => wT[0]) };
  },
  DFP() { },
  BFGS() { },
  Broyden() { },
};
