/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-04 12:53:47
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-19 15:43:25
 */
function 逻辑回归(data) {

  function sigmoid(z) {
    return 1 / (1 + Math.pow(Math.E, -z));
  }

  let m = data.length;
  let d = data[0].length;
  /**
   * J(w) = -1/m * Σ{y_i * ln p(x_i) + (1 - y_i) * ln [1 - p(x_i)]}
   *      = -1/m * Σ[y_i * w^T * x_i - ln (1 + e^{w^T * x_i})]
   * 
   * w: d*1
   * x_i: d*1
   * X: m*d
   * Y: m*1
   * @param {*} wT 
   */
  function J(wT) {
    return -data.map(row => {
      let y_i = row[row.length - 1];
      // let x_i = new Matrix([[...row.slice(0, row.length - 1), 1]]);
      // let wTx_i = wT.product(x_i.transpose()).data[0][0];
      let wTx_i = row[0] * wT.data[0][0] + row[1] * wT.data[0][1] + 1 * wT.data[0][2];
      return y_i * wTx_i - Math.log1p(Math.pow(Math.E, wTx_i));
    }).reduce((s, v) => s + v, 0) / m;
  }

  /**
   * J_w(w) = 1/n * Σ{sigmoid(w^T * x_i) - y_i} * x_i
   * 
   * w: m*1
   * x_i: m*1
   * X: m*d
   * Y: m*1
   * @param {*} wT 
   */
  function J_w(wT) {
    return data.map(row => {
      let x_iT = new Matrix([[...row.slice(0, d - 1), 1]]);
      let x_i = x_iT.transpose();
      let y_i = row[d - 1];
      let wTx_i = wT.product(x_i).data[0][0];
      return x_iT.scale(sigmoid(wTx_i) - y_i);
    }).reduce((s, v) => s.add(v), Matrix.zeros(1, d)).scale(1 / m);
  }

  /**
   * 计算海塞矩阵
   * 
   * H_w(w) = 1/m * Σx_i * x_i^T * sigmoid(w^T * x_i) * (1 - sigmoid(w^T * x_i))
   * 
   * w: d*1
   * x_i: d*1
   * X: m*d
   * Y: m*1
   * 
   * @param {*} wT 
   */
  function H_w(wT) {
    return data.map(row => {
      let x_iT = new Matrix([[...row.slice(0, d - 1), 1]]);
      let x_i = x_iT.transpose();
      let X_i = x_i.product(x_iT);
      let wTx_i = wT.product(x_i).data[0][0];
      let σ = sigmoid(wTx_i);
      return X_i.scale(σ * (1 - σ));
    }).reduce((s, v) => s.add(v), Matrix.zeros(d)).scale(1 / m);
  }

  let gd = Optimize.GD(J_w, Matrix.zeros(1, d), 1E0, 1E4, 1E-20);
  let nm = Optimize.NewtonsMethod(J_w, H_w, Matrix.zeros(1, d), 1E3, 1E-20);

  return {
    methods: [
      {
        name: '梯度下降法',
        ...gd,
      },
      {
        name: '牛顿法',
        ...nm,
      }
    ], J
  };
}