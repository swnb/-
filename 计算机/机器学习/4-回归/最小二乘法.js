/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-08 22:17:55
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-04 17:26:26
 */
function 最小二乘法(data) {
  /**
   * 求 y = k * x + b
   * 对 J(k,b) = Σ[yi - (k * xi + b)] ^ 2 求极小值
   * 
   * J_k = Σ [(k * xi + b) - yi] * xi = 0
   * J_b = Σ [(k * xi + b) - yi] = 0
   * 
   * 解得
   *      N * Σyi*xi - Σyi * Σxi
   * k = -------------------------
   *      N * Σxi*xi - Σxi * Σxi
   * 
   * b = Σyi - k * Σxi
   */
  let N = data.length;
  let sumOfX = 0;
  let sumOfY = 0;
  let sumOfXX = 0;
  let sumOfYX = 0;
  data.forEach(value => {
    sumOfX += value[0];
    sumOfY += value[1];
    sumOfXX += value[0] * value[0];
    sumOfYX += value[0] * value[1];
  })
  let k = (N * sumOfYX - sumOfY * sumOfX) / (N * sumOfXX - sumOfX * sumOfX)
  let b = (sumOfY - k * sumOfX) / N;
  return { k, b };
}

function 最小二乘法之梯度下降(data) {
  /**
   * 求 y = k * x + b
   * 对 J(k,b) = 1/2N * Σ[(k * xi + b) - yi] ^ 2 求极小值
   * 
   * J_k = 1/N * Σ [(k * xi + b) - yi] * xi = 0
   * J_b = 1/N * Σ [(k * xi + b) - yi] = 0
   * 
   * 迭代求解
   * kn+1 = kn + η * J_k
   * bn+1 = bn + η * J_b
   */
  let _data = data;
  let total = data.length;
  let η = 1E-5;
  let k = 10;
  let sumX = 0;
  let sumY = 0;
  let sumXX = 0;
  let sumXY = 0;
  let sumYY = 0;
  _data.forEach(value => {
    sumX += value[0];
    sumY += value[1];
    sumXX += value[0] * value[0];
    sumXY += value[0] * value[1];
    sumYY += value[1] * value[1];
  });
  let meanX = sumX / total;
  let meanY = sumY / total;
  let b = meanY - k * meanX;
  data = data.map(value => [value[0] - meanX, value[1] - meanY]);
  function J(k, b) {
    return (sumXX * k * k + total * b * b + 2 * sumX * k * b - 2 * sumXY * k - 2 * sumY * b + sumYY) / (2 * total);
    // return _data.map(value => (k * value[0] + b) - value[1]).map(value => value * value).reduce((sum, value) => sum + value, 0) / (2 * total);
  }
  function J_k(k, b) {
    return data.map(value => ((k * value[0] + b) - value[1]) * value[0]).reduce((s, v) => s + v, 0) / total;
  }
  // function J_b(k, b) {
  //   return data.map(value => (k * value[0] + b) - value[1]).reduce((s, v) => s + v, 0) / total;
  // }
  let N = 5000;
  let kbs = [];
  for (let i = 0; i < N; i++) {
    let Jk = J_k(k, b);
    k -= η * Jk;
    b = meanY - k * meanX;

    kbs.push({ k, b });

    if (Math.equal(Jk, 0)) {
      break;
    }
  }
  for (let i = 1; i < kbs.length; i++) {
    console.log(
      (kbs[i].k - kbs[i - 1].k) / (kbs[i].b - kbs[i - 1].b)
    )
  }
  return { k, b, kbs, J };
}