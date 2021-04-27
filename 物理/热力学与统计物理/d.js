/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-01 15:36:52
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-01 17:23:51
 */

const add = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]]
const sub = (v1, v2) => [v1[0] - v2[0], v1[1] - v2[1]]
const normal2 = v => v[0] ** 2 + v[1] ** 2
const normal = v => normal2(v) ** .5
const scale = (v, k) => [v[0] * k, v[1] * k]
const normalize = v => {
  let normal = normal(v)
  if (normal === 0) return v
  return scale(v, 1 / normal)
}
const rotate = (v, angle) => {
  let sin = Math.sin(angle)
  let cos = Math.cos(angle)
  return [cos * v[0] - sin * v[1], sin * v[0] + cos * v[1]]
}


const calc = () => {
  let u0 = [1, 0]
  let u0l = 1
  let NA = 100
  let dA = Math.PI / NA
  let NV = 20
  let data = []
  for (let c = 0; c <= 30; c += .1) {
    let v0l = c * u0l
    let max = (u0l ** 2 + v0l ** 2) ** .5
    let u1v1 = Array(NV).fill(undefined).map(_ => Array(NV).fill(0))
    data.push(u1v1)
    let total = 0
    for (let av0 = 0; av0 <= 2 * Math.PI; av0 += dA) {
      let v0 = [v0l * Math.cos(av0), v0l * Math.sin(av0)]
      let w = sub(u0, v0)
      // 速度向量 与 位置向量 夹角 是 均匀分布
      for (let av1 = -Math.PI / 2; av1 <= Math.PI / 2; av1 += dA) {
        let wu = scale(rotate(w, av1), Math.cos(av1))
        let wv = scale(rotate(w, av1 - Math.PI / 2), Math.sin(av1))
        let u1 = add(wu, v0)
        let v1 = add(wv, v0)

        let u1l = normal(u1)
        let v1l = normal(v1)

        let i = Math.floor(u1l * NV / max)
        let j = Math.floor(v1l * NV / max)
        i = Math.min(i, NV - 1)
        j = Math.min(j, NV - 1)

        u1v1[i][j]++
        total++

        // let dE = (normal2(u1) + normal2(v1)) - (normal2(u0) + normal2(v0))
        // if (dE > 1E-2) {
        //   console.error('error')
        //   return
        // }
      }
    }
    u1v1.forEach((row, i)=> {
      row.forEach((col, j)=>{
        u1v1[i][j] /= total
      })
    })
  }
  return data
}

let uvData = calc()
// console.log(uvData)
