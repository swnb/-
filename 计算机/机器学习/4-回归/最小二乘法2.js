/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-08 22:17:55
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-19 15:12:09
 */
/**
   * 求 y = w^T * x
   * 对 J(w) = 1/2m * Σ(w^T * x_i - y_i)^2 求极小值
   * J_w = 2 * Σ(w^T * x_i - y_i) * x_i = 0
   * 
   * (w^T * X^T - Y^T) * X = 0
   * w: d*1
   * X: m*d
   * Y: m*1
   * w^T * X^T * X = Y^T * X
   * 
   * 解得
   * w^T = Y^T * X * (X^T * X)^-1
   */
function 最小二乘法(data) {
  let d = data[0].length - 1;
  let m = data.length;
  let X = Matrix.func(m, d, (i, j) => data[i][j]);
  let Y = Matrix.func(m, 1, (i, j) => data[i][d]);
  return Y.transpose().product(X).product(X.transpose().product(X).inverse());
}

function 最小二乘法之梯度下降(data) {
  /**
   * 求 y = k * x + b
   * 对 J(w) = 1/2m * Σ(w^T * x_i - y_i)^2 求极小值
   * J(w) = 1/2m * (w^T * X^T - Y^T)^2
   * J(w) = 1/2m * (w^T * (X^T * X) * w - 2 * w^T * X^T * Y + Y^T * Y)
   * 
   * w: d*1
   * X: m*d
   * Y: m*1
   * 
   * J_w = 1/m * Σ(w^T * x_i - y_i) * x_i
   * J_w = 1/m * (w^T * X^T - Y^T) * X
   * 
   * 迭代求解
   * w_{n+1} = w_n + η * J_w
   */
  let d = data[0].length - 1;
  let m = data.length;
  let X = Matrix.func(m, d, (i, j) => data[i][j]);
  let Y = Matrix.func(m, 1, (i, j) => data[i][d]);

  /**
   * 求 y = k * x + b
   * 对 J(w) = 1/2m * Σ(w^T * x_i - y_i)^2 求极小值
   * J(w) = 1/m * (w^T * X^T - Y^T)^2
   * J(w) = 1/m * (w^T * (X^T * X) * w - 2 * w^T * X^T * Y + Y^T^2)
   * J(w) 1*1
   */
  let XT = X.transpose();
  let XTX = XT.product(X);
  let YT = Y.transpose();
  let YTY = YT.product(Y);
  let XTY2 = XT.product(Y).scale(2);
  function J(wT) {
    return (wT.product(XTX).product(wT.transpose()).sub(wT.product(XTY2)).add(YTY))[0][0] / (2 * m);
  }
  /**
   * J_w = 1/m * Σ(w^T * x_i - y_i) * x_i
   * J_w = 1/m * (w^T * X^T - Y^T) * X
   * 
   * w: d*1
   * X: m*d
   * Y: m*1
   * 
   * J_w: 1*d
   * @param {*} wT
   */
  function J_w(wT) {
    return wT.product(XT).sub(YT).product(X).scale(1 / m);
  }

  function H_w(wT) {
    return XTX.scale(1 / m);
  }

  let gd = Optimize.GD(J_w, Matrix.zeros(1, d));
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