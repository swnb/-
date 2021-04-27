/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-15 16:51:36
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-16 18:43:48
 */

function 我写的相关性分析(board, dataSet) {
  let data = dataSet.data
  let varsCount = data[0].length
  board.style.width = '700px'
  board.style.height = '700px'
  let 统计量 = 计算数据集的统计量(dataSet)
  let html = [`<table 
    cellspacing="0" 
    style="
    width:500px;
    height:500px;
    font-size:12px;
    text-align: center;
    ">`]
  for (let i = 0; i < varsCount; i++) {
    html.push(`<tr>`)
    html.push(`<td>${dataSet.vars[i]}</td>`)
    for (let j = 0; j < varsCount; j++) {
      let 相关系数 = 统计量.相关系数矩阵[i][j].toFixed(2)
      let red = 相关系数 > 0 ? 255 : 0
      let blue = 255 - red
      let backgroundColor = `rgba(${red},0,${blue}, ${Math.abs(相关系数)})`
      let color = Math.abs(相关系数) > 0.5 ? 'white' : 'black'
      html.push(`<td style="
        background-color:${backgroundColor}; 
        color:${color};
      ">${相关系数}</td>`)
    }
    html.push(`</tr>`)
  }
  html.push(`<tr><td></td>${dataSet.vars.map(v => `<td>${v}</td>`).join('')}</tr>`)
  html.push('</table>')
  board.innerHTML = html.join('')
}

function 相关性分析(board, dataSet) {
  board.style.width = '700px'
  board.style.height = '700px'
  var myChart = echarts.init(board)
  var option;
  let 统计量 = 计算数据集的统计量(dataSet)

  let data = []
  统计量.相关系数矩阵.forEach((row, i)=>{
    row.forEach((col, j)=>{
      data.push([i, j, col.toFixed(2)])
    })
  })

  option = {
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: dataSet.vars,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: dataSet.vars,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: -1,
      max: 1,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%'
    },
    series: [{
      name: '相关系数',
      type: 'heatmap',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  option && myChart.setOption(option);
}

function 直方图(board, dataSet, index) {
  let barData = 转成直方图数据(dataSet.data.map(row => row[index]))
  board.style.width = '400px'
  board.style.height = '400px'
  var myChart = echarts.init(board)
  var option;
  option = {
    xAxis: {
      type: 'category',
      data: barData.xAxis,
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: barData.yAxis,
      type: 'bar'
    },
    {
      data: barData.yAxis,
      type: 'line',
      smooth: true
    }]
  };

  option && myChart.setOption(option);
}