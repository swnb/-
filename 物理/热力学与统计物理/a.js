const { func } = require('./common/数学/Matrix')
/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-31 10:36:14
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-31 16:37:44
 */

/*
https://www.zhihu.com/question/442174629
蜗牛从10米深的井底爬，白天爬一米，晚上下落x米，其中x为[0,2]米的随机数，那么爬上所需的天数的期望是多少？
*/
const Matrix = require('./common/数学/Matrix')

function 实验求解(depth) {
  function 实验() {
    let distance = 0
    let i = 0
    while (true) {
      i++
      distance++
      if (distance >= depth) break
      distance -= Math.random() * 2
      distance = Math.max(0, distance)
    }
    return i
  }
  
  let 统计量 = []
  for (let i = 0; i < 1E3; i++) {
    let dayList = Array(1E3).fill(undefined).map(实验)
    let E = dayList.reduce((s, v) => s + v) / dayList.length
    let D = dayList.map(v => (v - E) ** 2).reduce((s, v) => s + v) / dayList.length
    统计量.push({ E, D })
  }
  // console.log(统计量)
  console.log(统计量.map(_ => _.E).reduce((s, v) => s + v) / 统计量.length)
  console.log(统计量.map(_ => _.D).reduce((s, v) => s + v) / 统计量.length)
    
}
实验求解(3)

function 魔法少女蔡徐伦() {
  const Ed3 = () => {
    let θ = 1 / 4
    let sin = Math.sin(θ)
    let cos = Math.cos(θ)
    return 1 + 2 * ((sin - cos) / (cos - 3 * sin)) ** 2
  }
  console.log(Ed3())
}
魔法少女蔡徐伦()

function 鲈鱼柳() {
  let mP = new Matrix([
    [5, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 4, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 4, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 4, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 4, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 4, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 4, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 4, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 6]
  ]).scale(1 / 6)
  let d = 9;
  let mQ = mP.extract(0, d, 0, d)
  let mN = Matrix.eye(d).sub(mQ).inverse(1E-10)
  console.log(mN.data[0].reduce((s, v) => s + v))
}
鲈鱼柳()
