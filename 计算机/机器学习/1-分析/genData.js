/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-16 10:14:37
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-16 10:46:27
 */
(function(){
  let data = [];
  let featureCount = 10;
  let sampleCount = 1000;
  
  let σs = Array(featureCount).fill(1);
  
  function rnd(vector, index) {
    return vector[index] + Math.rnd(-σs[index] / 5, σs[index] / 5)
  }
  
  function rvpow(vector, index, b) {
    return pow(rnd(vector, index), b);
  }
  
  function pow(a, b) {
    return (a ** 2) ** (b / 2);
  }
  
  function genFeature3(vector) {
    return -1.2 * vector[0]
      + .4 * (rnd(vector, 1)
        + 0.6 * rvpow(vector, 2, 1.1)
      )
      - 4.4 * rvpow(vector, 4, .8)
      + Math.E ** (
        .1 * rvpow(vector, 4, 1.2)
        - .2 * rvpow(vector, 1, 1.1)
        + .1 * rvpow(vector, 8, .9)
      )
      + Math.rnd(-1 / 2, 1 / 2);
  }
  
  function genFeature5(vector) {
    return 1.2 * rvpow(vector, 0, 1.1)
      + .7 * rnd(vector, 4) / (
        15 +
        1.1 * rnd(vector, 2)
        - 2.1 * rnd(vector, 1)
      )
      + Math.rnd(-1 / 4, 1 / 4);
  }
  
  function genFeature6(vector) {
    return -.1 * Math.log1p(
      rvpow(vector, 8, 2)
      + 2.1 * rvpow(vector, 1, 2)
    )
      / (
        13.2 +
        12.1 * rnd(vector, 4)
        - 11.2 * rnd(vector, 1)
      )
      + Math.rnd(-1 / 4, 1 / 4);
  }
  
  function genFeature7(vector) {
    return Math.log1p(Math.pow(5.4 / (
      rnd(vector, 1) * rnd(vector, 5)
      + 2.1 * rnd(vector, 8))
      - 1.2 * rvpow(vector, 4, (
        .1 - .1 / (
          13.1 +
          rnd(vector, 1)
          - 2.3 * rnd(vector, 4)
        )
      )
      ), 2))
      + Math.rnd(-1, 1);
  }
  
  function genFeature9(vector) {
    return 3.4 / (
      8.2 +
      -0.9 * rvpow(vector, 0, (rnd(vector, 0) / 2))
      + rnd(vector, 7) * rnd(vector, 1)
      - 0.2 * rvpow(vector, 2, 1.1))
      + 1.2 * rvpow(vector, 7, (
        .1
        + .1 / (
          4.4 +
          Math.cos(
            rnd(vector, 3)
            - 1.3 * rnd(vector, 4)
          )
        )
      )
      )
      + Math.rnd(-1, 1);
  }
  
  function genLabel(vector) {
    return -0.8 * rnd(vector, 6)
      + 1.7 * (rvpow(vector, 3, 2.1))
      + 2.1 * (rnd(vector, 5) - 1.7 * rnd(vector, 2))
      - 2.1 * rnd(vector, 9)
      + 0.2 * rvpow(vector, 8, (
        -.1 * rnd(vector, 1)
        + .1 * rnd(vector, 3)
      )
      )
      + Math.E ** (-1E-3 * rnd(vector, 4) + 2E-3 * rnd(vector, 1) - 1E-3 * rnd(vector, 7))
      + Math.rnd(-1, 1)
      ;
  }
  
  for (let i = 0; i < sampleCount; i++) {
    let vector = Array(featureCount + 1).fill(0);
    vector[0] = Math.random() * 4;
    vector[1] = Math.rnd(-1, 1);
    vector[2] = Math.rnd(-1, 1);
    vector[4] = Math.rnd(-1, 1);
    vector[8] = Math.rnd(-1, 1);
  
    vector[3] = genFeature3(vector);
    vector[5] = genFeature5(vector);
    vector[6] = genFeature6(vector);
    vector[7] = genFeature7(vector);
    vector[9] = genFeature9(vector);
  
    vector[10] = genLabel(vector);
  
    data.push(vector);
  }
  
  window.dataSet = {
    data,
    vars: ['特征1','特征2','特征3','特征4','特征5',
    '特征6','特征7','特征8','特征9','特征10', '结果'],
  }
  
})();
