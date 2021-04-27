/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-16 11:36:07
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-16 14:12:05
 */
function 转成直方图数据(data, barsCount = 10) {
  barsCount = Math.max(Math.min(barsCount, 50), 1)
  let sortedData = data.sort((a, b) => a - b);
  let min = sortedData[0];
  let max = sortedData[sortedData.length - 1];
  let xAxis = Array(barsCount).fill(undefined)
    .map((_, index) => ((max - min) * index / barsCount + min).toFixed(2));
  let yAxis = Array(barsCount + 1).fill(0);
  for (let i = 0; i < sortedData.length; i++) {
    let value = sortedData[i];
    yAxis[Math.round(barsCount * value / max)]++;
  }

  console.log(data)
  console.log(xAxis)
  console.log(yAxis)

  return {
    xAxis,
    yAxis,
  }
}

function 计算统计量(data) {
  let 期望 = data.reduce((s, v) => s + v / data.length, 0)
  let 方差 = data.reduce((s, v) => s + (v - 期望) ** 2 / data.length, 0)

  return {
    期望,
    方差
  }
}

function 计算数据集的统计量(dataSet) {
  let data = dataSet.data
  let 样本数 = data.length
  let 变量数 = data[0].length
  let 期望 = data.reduce((s, v) => {
    for (let i = 0; i < 变量数; i++) {
      s[i] += v[i] / 样本数;
    }
    return s
  }, Array(变量数).fill(0))

  let 方差 = data.reduce((s, v) => {
    for (let i = 0; i < 变量数; i++) {
      s[i] += (v[i] - 期望[i]) ** 2 / 样本数;
    }
    return s
  }, Array(变量数).fill(0))

  let 协方差矩阵 = Array(变量数).fill(undefined).map((_, i) => {
    return data.reduce((s, v) => {
      for (let k = 0; k < 变量数; k++) {
        s[k] += (v[i] - 期望[i]) * (v[k] - 期望[k]) / 样本数
      }
      return s
    }, Array(变量数).fill(0))
  })

  let 相关系数矩阵 = 协方差矩阵.map((row, i) => row.map((col, j) => col /
    (
      (方差[i] * 方差[j]) ** .5
    )
  )
  )

  return {
    期望,
    方差,
    协方差矩阵,
    相关系数矩阵
  }
}
